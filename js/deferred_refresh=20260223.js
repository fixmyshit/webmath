ConsoleLog("deferred.js Version 1.02");
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('input.MathResponse').forEach(function (el) {
        el.setAttribute('autocomplete', 'off');
    });
});