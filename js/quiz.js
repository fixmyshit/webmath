/*
 * quiz.js - local, offline quiz logic for the Web Math Minute test copy.
 *
 * Flow:  setup form  ->  startRun()  ->  quiz sheet  ->  finish()  ->  results
 *
 * "Test controls" (only used when "Solve answers when I press Start" is ticked):
 *   - Missed questions : how many answers get filled in WRONG on purpose
 *   - Time taken (sec) : the time shown on the results screen (empty = real time)
 */
(function () {
    'use strict';

    // ---------- Small helpers ----------
    const $ = (id) => document.getElementById(id);

    const SYMBOL = { A: '+', S: '\u2212', M: '\u00d7', D: '\u00f7' };

    function randInt(min, max) {                       // whole number from min to max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randNonZero(min, max) {                   // like randInt but never 0 (for divisors)
        if (min === 0 && max === 0) return 1;
        let n;
        do { n = randInt(min, max); } while (n === 0);
        return n;
    }

    function shuffle(list) {                           // Fisher-Yates shuffle (returns same array)
        for (let i = list.length - 1; i > 0; i--) {
            const j = randInt(0, i);
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }

    function toNonNegInt(text, fallback) {             // "12" -> 12, ""/"abc"/"-3" -> fallback
        if (String(text).trim() === '') return fallback;
        const n = Number(text);
        return Number.isFinite(n) && n >= 0 ? Math.round(n) : fallback;
    }

    function formatTime(totalSeconds) {                // 75 -> "1:15"
        const s = Math.max(0, Math.floor(totalSeconds));
        return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    }

    function el(tag, className, text) {                // tiny DOM builder
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    // ---------- Screens ----------
    const screens = {
        setup:   $('setupScreen'),
        quiz:    $('quizScreen'),
        results: $('resultsScreen')
    };

    function show(name) {
        Object.keys(screens).forEach((key) => { screens[key].hidden = (key !== name); });
        window.scrollTo(0, 0);
    }

    function showError(message) { const p = $('setupError'); p.textContent = message; p.hidden = false; }
    function hideError()        { $('setupError').hidden = true; }

    // ---------- Reading the form ----------
    function readSettings() {
        const ops = Array.from(document.querySelectorAll('input[name="OPERATIONS[]"]:checked'))
                         .map((box) => box.value);

        let min = Number($('MINIMUM').value);
        let max = Number($('MAXIMUM').value);
        if (min > max) { const t = min; min = max; max = t; }      // forgive min > max

        const practiceRaw = $('PRACTICE').value;
        const count = Number($('QUESTIONS').value);

        return {
            ops:       ops,
            min:       min,
            max:       max,
            practice:  practiceRaw === '' ? null : Number(practiceRaw),
            count:     count,
            limit:     toNonNegInt($('TIMER').value, 0),            // 0 = no time limit
            auto:      $('AUTOSOLVE').checked,
            missed:    Math.min(count, toNonNegInt($('MISSED').value, 0)),
            timeTaken: toNonNegInt($('TIMETAKEN').value, null)      // null = use real time
        };
    }

    // ---------- Making questions ----------
    function makeQuestion(op, min, max, practice) {
        let a, b, answer;

        if (op === 'D') {
            // Build it backwards so the answer is always a whole number: (b * q) / b = q
            b = (practice !== null) ? practice : randNonZero(min, max);
            const q = randInt(min, max);
            a = b * q;
            answer = q;
        } else {
            a = randInt(min, max);
            b = randInt(min, max);

            if (practice !== null) {
                b = practice;
                if (op === 'S') {
                    if (min >= 0) a = randInt(Math.min(practice, max), Math.max(practice, max)); // keep answer >= 0
                } else if (Math.random() < 0.5) {
                    const t = a; a = b; b = t;                                                   // vary the order
                }
            } else if (op === 'S' && min >= 0 && a < b) {
                const t = a; a = b; b = t;                                                       // no negative answers
            }

            answer = (op === 'A') ? a + b : (op === 'S') ? a - b : a * b;
        }

        const shownB = b < 0 ? '(' + b + ')' : String(b);
        return { text: a + ' ' + SYMBOL[op] + ' ' + shownB + ' =', answer: answer };
    }

    function wrongAnswerFor(answer) {                  // a believable wrong answer (never equal to the answer)
        let offset;
        do { offset = randInt(-3, 3); } while (offset === 0);
        return answer + offset;
    }

    // ---------- Running a quiz ----------
    let run = null;   // everything about the current attempt lives here

    function startRun(settings) {
        if (settings.ops.length === 0) { showError('Pick at least one type of math.'); return; }
        hideError();

        const questions = [];
        for (let i = 0; i < settings.count; i++) {
            const op = settings.ops[randInt(0, settings.ops.length - 1)];
            questions.push(makeQuestion(op, settings.min, settings.max, settings.practice));
        }

        run = {
            s: settings,
            questions: questions,
            inputs: [],
            startedAt: performance.now(),
            timerId: null,
            finished: false
        };

        buildSheet();
        $('remainingWrap').hidden = (settings.limit === 0);
        $('elapsed').textContent = '0:00';
        $('remaining').textContent = formatTime(settings.limit);
        $('remaining').style.color = '';
        updateProgress();
        show('quiz');

        if (settings.auto) {                           // "solve it for me" mode
            autoSolve();
            finish();
            return;
        }

        run.inputs[0].focus();
        run.timerId = setInterval(tick, 200);
        tick();
    }

    function buildSheet() {
        const sheet = $('sheet');
        sheet.textContent = '';

        run.questions.forEach((q, i) => {
            const row = el('div', 'QuizQ');
            row.appendChild(el('span', 'N', (i + 1) + '.'));
            row.appendChild(el('span', 'T', q.text));

            const input = el('input', 'MathResponse');
            input.type = 'text';
            input.autocomplete = 'off';
            input.addEventListener('input', updateProgress);
            input.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                const next = run.inputs[i + 1];
                if (next) next.focus(); else finish();  // Enter on the last box = finish
            });

            row.appendChild(input);
            sheet.appendChild(row);
            run.inputs.push(input);
        });
    }

    function updateProgress() {
        if (!run) return;
        const answered = run.inputs.filter((box) => box.value.trim() !== '').length;
        $('progress').textContent = answered + ' / ' + run.questions.length + ' answered';
    }

    function tick() {
        const elapsed = (performance.now() - run.startedAt) / 1000;
        $('elapsed').textContent = formatTime(elapsed);

        if (run.s.limit > 0) {
            const left = Math.max(0, run.s.limit - elapsed);
            $('remaining').textContent = formatTime(Math.ceil(left));
            $('remaining').style.color = (left <= 10) ? '#F00' : '';   // last 10 seconds go red
            if (left <= 0) finish();                   // time's up
        }
    }

    function autoSolve() {
        // Pick which questions to get wrong, then fill every box.
        const wrongSet = new Set(
            shuffle(run.questions.map((q, i) => i)).slice(0, run.s.missed)
        );
        run.questions.forEach((q, i) => {
            run.inputs[i].value = String(wrongSet.has(i) ? wrongAnswerFor(q.answer) : q.answer);
        });
        updateProgress();
    }

    // ---------- Finishing + results ----------
    function finish() {
        if (!run || run.finished) return;
        run.finished = true;
        clearInterval(run.timerId);

        let elapsed = (performance.now() - run.startedAt) / 1000;
        if (run.s.limit > 0) elapsed = Math.min(elapsed, run.s.limit);

        // Mark every question
        const rows = run.questions.map((q, i) => {
            const raw = run.inputs[i].value.trim();
            let status;
            if (raw === '')                    status = 'blank';
            else if (/^-?\d+$/.test(raw) && Number(raw) === q.answer) status = 'correct';
            else                               status = 'wrong';
            return { q: q, raw: raw, status: status };
        });

        const correct = rows.filter((r) => r.status === 'correct').length;
        const wrong   = rows.filter((r) => r.status === 'wrong').length;
        const blank   = rows.filter((r) => r.status === 'blank').length;
        const missed  = wrong + blank;

        const usedPreset = run.s.auto && run.s.timeTaken !== null;
        const timeTaken  = usedPreset ? run.s.timeTaken : elapsed;

        renderResults({
            total: rows.length, correct: correct, missed: missed, blank: blank,
            timeTaken: timeTaken, usedPreset: usedPreset, rows: rows
        });
        show('results');
    }

    function card(big, label, sub, isRed) {
        const box = el('div', 'Card');
        box.appendChild(el('span', isRed ? 'Big Red' : 'Big', big));
        box.appendChild(el('span', 'Sub', label));
        if (sub) box.appendChild(el('span', 'Sub', sub));
        return box;
    }

    function renderResults(r) {
        const summary = $('summary');
        summary.textContent = '';

        const perMinute = r.timeTaken > 0 ? (r.correct / (r.timeTaken / 60)).toFixed(1) : '\u2014';
        const percent   = r.total > 0 ? Math.round((r.correct / r.total) * 100) + '%' : '\u2014';

        summary.appendChild(card(r.correct + ' / ' + r.total, 'correct', percent));
        summary.appendChild(card(String(r.missed), 'missed', r.blank ? r.blank + ' left blank' : '', r.missed > 0));
        summary.appendChild(card(formatTime(r.timeTaken), 'time taken', r.usedPreset ? '(preset)' : '(real time)'));
        summary.appendChild(card(perMinute, 'correct per minute'));

        const body = $('review').querySelector('tbody');
        body.textContent = '';

        r.rows.forEach((row, i) => {
            const tr = document.createElement('tr');
            if (row.status === 'wrong') tr.className = 'Wrong';
            if (row.status === 'blank') tr.className = 'Blank';

            tr.appendChild(el('td', '', String(i + 1)));
            tr.appendChild(el('td', '', row.q.text));
            tr.appendChild(el('td', '', row.raw === '' ? '\u2014' : row.raw));
            tr.appendChild(el('td', '', String(row.q.answer)));
            tr.appendChild(el('td', '', row.status === 'correct' ? '\u2713' : '\u2717'));
            body.appendChild(tr);
        });
    }

    // ---------- Wire up the page ----------
    $('WSHFORM').addEventListener('submit', (event) => {
        event.preventDefault();                        // stay on this page - no server involved
        startRun(readSettings());
    });

    $('finishBtn').addEventListener('click', finish);
    $('againBtn').addEventListener('click', () => { if (run) startRun(run.s); });
    $('changeBtn').addEventListener('click', () => { hideError(); show('setup'); });
})();
