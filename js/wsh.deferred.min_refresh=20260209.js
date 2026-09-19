document.addEventListener("DOMContentLoaded", () => {

ConsoleLog("allforminputs - Version 1.01");

const WSHFORM = document.getElementById("WSHFORM");

if (!WSHFORM)               return;

const AllFormInputs = WSHFORM.querySelectorAll("input");

if (!AllFormInputs.length)   return;

ConsoleLog("AllFormInputs - EventListener Version 1.4");

let totalInputs    = 0;

let totalChanged  = 0;

AllFormInputs.forEach(input => {

totalInputs++;

if ( input.type === "hidden" )   return; // Skip hidden inputs

if ( input.id )                  return; // Skip if ID is already set

if ( !input.name )               return; // Skip if NAME isn't already set

if (input.name.endsWith("[]"))   return; // Skip if name ends with [] for fields with multiple values because repeating NAMES is okay but IDs must be unique

input.id = input.name.trim();

totalChanged++;

});

ConsoleLog("AllFormInputs - Inputs found: " + totalInputs + "  Inputs changed: " + totalChanged  + " (ID set from NAME)");

const AllFormTextareas = WSHFORM.querySelectorAll("textarea");

AllFormTextareas.forEach(textarea => {

textarea.addEventListener('input', () => {

autoResizeTextarea(textarea);

});

autoResizeTextarea(textarea);

});

function autoResizeTextarea(textarea) {

window.requestAnimationFrame(() => {

textarea.style.height = 'auto'; // Reset

textarea.style.height = textarea.scrollHeight + 'px'; // Grow to fit content

});

}

});

document.addEventListener("DOMContentLoaded", () => {

const BubbleMessage = document.getElementById("BubbleMessage");

if (!BubbleMessage) return;            // Exit early if it doesn't exist

ConsoleLog("BubbleMessage() Version 1.1");

let offsetX, offsetY, isDragging = false, startX = 0, startY = 0, hasMoved = false;

restorePosition("BubbleMessage");

BubbleMessage.addEventListener("mousedown", (e) => {

e.preventDefault(); // Prevent text selection

isDragging = true;

hasMoved = false;

startX = e.clientX;

startY = e.clientY;

offsetX = e.clientX - BubbleMessage.getBoundingClientRect().left;

offsetY = e.clientY - BubbleMessage.getBoundingClientRect().top;

BubbleMessage.style.cursor = "grabbing";

});

window.addEventListener("mousemove", (e) => {

if (!isDragging) return;

if (Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3) {

hasMoved = true;

}

let zoomFactor       = document.body.style.zoom ? parseFloat(document.body.style.zoom) / 100 : 1;

let x                = Math.round((e.clientX - offsetX) / zoomFactor);

let y                = Math.round((e.clientY - offsetY) / zoomFactor);

BubbleMessage.style.left = `${x}px`;

BubbleMessage.style.top  = `${y}px`;

});

window.addEventListener("mouseup", () => {

if (isDragging && hasMoved) {

savePosition("BubbleMessage");

}

isDragging = false;

BubbleMessage.style.cursor = "grab";

});

BubbleMessage.addEventListener("click", (e) => {

if (hasMoved) e.preventDefault();

});

});

function ClickSet(FieldID,NewValue)

{ var inputField = document.getElementById(FieldID);

inputField.value=NewValue;

}

document.addEventListener('DOMContentLoaded', () => {

document.querySelectorAll('.CopyClipboard').forEach(icon => {

ConsoleLog('Clipboard() Version 1.2');

icon.addEventListener('click', () => {

let textElement = icon.previousSibling;

while (textElement && textElement.nodeType !== Node.ELEMENT_NODE && textElement.nodeType !== Node.TEXT_NODE) {

textElement = textElement.previousSibling;

}

let textToCopy = '';

if (textElement.nodeType === Node.TEXT_NODE) {

textToCopy = textElement.textContent.trim();

} else {

textToCopy = textElement.innerText.trim();

}

navigator.clipboard.writeText(textToCopy).then(() => {

ConsoleLog('Clipboard has been copied');    //, textToCopy);

icon.classList.add('InstantSwap'); // Disable transition temporarily

icon.src = 'https://webstorehouse.com/images/icons/checkmark.png?nocache=123';

void icon.offsetWidth;

icon.classList.remove('InstantSwap'); // Re-enable regular transition

setTimeout(() => {

icon.src = 'https://webstorehouse.com/images/actions/copyclipboard.png';

}, 2000);

}).catch(err => {

if ( SAdev() )  console.error('Clipboard - Failed to copy: ', err);

});

});

});

});

function DollarsClean(Input) {

ConsoleLog("DollarsClean() Version 1.4");

let val = Input.value.replace(/[^0-9.]/g, '');

if (val !== "0.00" && val.endsWith("0.00")) {

let trimmed = val.slice(0, -4);

if (trimmed.includes('.')) {

val = trimmed;  // Chop off trailing "0.00" only if decimal exists before it

}

}

val = val.replace(/[^0-9.]/g, '');

if (Input.value.trim() === "") {

Input.setCustomValidity('');

return;

}

const pattern = /^\d+(\.\d{1,2})?$/;

if (!pattern.test(val)) {

Input.setCustomValidity('Please enter a valid dollar amount (e.g., 123.45)');

} else {

Input.setCustomValidity('');

}

}

document.addEventListener("DOMContentLoaded", () => {

const dollarsInputs = document.querySelectorAll("input[data-dollars]");

if (!dollarsInputs.length) return;

ConsoleLog("Dollars - EventListener Version 1.4");

dollarsInputs.forEach(input => {

input.step         = "0.01";

input.min          = "-99999.99";

input.max          = "99999.99";

input.spellcheck   = false;

input.placeholder  = "0.00";

input.setCustomValidity("Please enter a dollar amount");

input.addEventListener("input", () => DollarsClean(input));

setTimeout(() => DollarsClean(input), 500);

});

document.querySelectorAll("form").forEach(form => {

form.addEventListener("submit", () => {

dollarsInputs.forEach(input => {

input.value = input.value.split(',').join('');  // sneaky way to remove all commas

if (input.value.trim() === "") {

input.value = "0";

input.setCustomValidity('');

}

});

});

});

});

ConsoleLog("Faqs() Version 1.03");

function FaqsSetAll(SHOW) {

document.querySelectorAll('.FAQ .Answer').forEach(function(ANSWER) {

ANSWER.style.display = SHOW ? 'block' : 'none';

});

}

function FaqsToggleAll() {

var ANSWERS = document.querySelectorAll('.FAQ .Answer');

var ANYCLOSED = Array.from(ANSWERS).some(function(ANSWER) {

return window.getComputedStyle(ANSWER).display === 'none';

});

FaqsSetAll(ANYCLOSED);

}

document.addEventListener('click', function(e) {

var QUESTION = e.target.closest('.FAQ .Question');

if (!QUESTION) return;

var ANSWER = QUESTION.nextElementSibling;

while (ANSWER && !ANSWER.classList.contains('Answer')) {

ANSWER = ANSWER.nextElementSibling;

}

if (!ANSWER) return;

if (window.getComputedStyle(ANSWER).display === 'none') {

ANSWER.style.display = 'block';

return;

}

ANSWER.style.display = 'none';

});

document.querySelectorAll('.FAQ .Question').forEach(function(QUESTION) {

if (!QUESTION.hasAttribute('title'))   { QUESTION.title = 'Click to see answer'; }

});

document.querySelectorAll('.MergeIcon').forEach(Icon => {

Icon.addEventListener('mousedown', (event) => {

ConsoleLog("Merge Mouse down on image!");

});

Icon.addEventListener('dragstart', (event) => {

ConsoleLog("Merge Drag started on image!");

event.dataTransfer.setData('iD', event.target.dataset.id);

});

Icon.addEventListener('dragover', (event) => {

event.preventDefault();  // Allow drop

});

Icon.addEventListener('drop', (event) => {

event.preventDefault();

const draggedID = event.dataTransfer.getData('iD');

const targetID  = event.target.dataset.id;

if (draggedID === targetID) {

ConsoleLog("Merge drop ignored: Cannot merge with itself.");

return;

}

ConsoleLog(`Merge Dropped! Dragged ID: ${draggedID}, Target ID: ${targetID}`);

let form         = document.createElement('form');

form.method  = 'POST';

form.action  = '';

let input1       = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = 'MERGE';

let input2       = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'ID';

input2.value = draggedID + "," + targetID;

form.appendChild(input1);

form.appendChild(input2);

document.body.appendChild(form);

form.submit();

});

});

document.addEventListener('DOMContentLoaded', () => {

document.querySelectorAll('.MonospaceToggle').forEach(icon => {

icon.addEventListener('click', () => {

const textarea = icon.previousElementSibling;

if (textarea && textarea.tagName === 'TEXTAREA') {

textarea.classList.toggle('Monospace');

}

});

});

});

let dragStartY = 0;

document.querySelectorAll('.MoveIcon').forEach(Icon => {

Icon.addEventListener('mousedown', (event) => {

ConsoleLog("Move Mouse down on image!");

});

Icon.addEventListener('dragstart', (event) => {

dragStartY = event.clientY;

ConsoleLog("Move Drag started on image at Y:",dragStartY);

event.dataTransfer.setData('iD', event.target.dataset.id);

});

Icon.addEventListener('dragover', (event) => {

event.preventDefault();  // Allow drop

});

Icon.addEventListener('drop', (event) => {

event.preventDefault();

const draggedID = event.dataTransfer.getData('iD');

const targetID  = event.target.dataset.id;

const dragEndY  = event.clientY;

if (draggedID === targetID) {

ConsoleLog("Move drop ignored: Cannot move to itself.");

return;

}

let direction = '';

if (dragEndY > dragStartY) { direction = 'Down'; }

else                       { direction = 'Up';   }

ConsoleLog(`Move Dropped! Dragged ID: ${draggedID} Target ID: ${targetID} Direction: ${direction}`);

let form         = document.createElement('form');

form.method  = 'POST';

form.action  = '';

let input1       = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = 'MOVE';

let input2       = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'ID';

input2.value = draggedID + "," + targetID;

let input3       = document.createElement('input');

input3.type  = 'hidden';

input3.name  = 'DIRECTION';

input3.value = direction;

form.appendChild(input1);

form.appendChild(input2);

form.appendChild(input3);

document.body.appendChild(form);

form.submit();

});

});

function MultiSelectGo(Action) {

let checkboxes = document.querySelectorAll('.MultiSelect:checked');

let form = document.createElement('form');

form.method = 'POST';

form.action = ''; // You can set a target URL here if needed

let actionInput = document.createElement('input');

actionInput.type = 'hidden';

actionInput.name = 'ACTION';

actionInput.value = Action;

form.appendChild(actionInput);

checkboxes.forEach(cb => {

let id = cb.getAttribute('data-id');

if (id !== null) {

let idInput = document.createElement('input');

idInput.type = 'hidden';

idInput.name = 'ID[]';

idInput.value = id;

form.appendChild(idInput);

}

});

document.body.appendChild(form);

form.submit();

}

function MultiSelectToggleAllBoxes( MasterCheckbox ) {

let Checkboxes     = document.querySelectorAll('.MultiSelect');

let Rows           = document.querySelectorAll('.WListRow');

Checkboxes.forEach(Checkbox => { Checkbox.checked = MasterCheckbox.checked; } );

if (MasterCheckbox.checked) {

Rows.forEach(Row => { Row.classList.add("MultiSelected"); } );

} else {

Rows.forEach(Row => { Row.classList.remove("MultiSelected"); } );

}

MultiSelectToggleButtons();

}

function MultiSelectArrowClicked() {

let MasterCheckbox = document.getElementById('MultiSelectMaster');

MasterCheckbox.checked = !MasterCheckbox.checked;

MultiSelectToggleAllBoxes(MasterCheckbox.checked);

MultiSelectToggleButtons();

}

function MultiSelectRowHilite( Checkbox ) {

let Row = Checkbox.closest(".WListRow"); // Find the closest row with class 'WListRow'

if (Checkbox.checked) {

Row.classList.add("MultiSelected"); // Add class to highlight the row

} else {

Row.classList.remove("MultiSelected"); // Remove class to unhighlight the row

}

MultiSelectToggleButtons();

}

function MultiSelectToggleButtons() {

let MasterButtons = document.getElementById('MultiSelectButtons');

let MasterCount   = document.getElementById('MultiSelectCount');

let Checkboxes    = document.querySelectorAll('.MultiSelect');

let Count         = document.querySelectorAll('.MultiSelect:checked').length;

let Total         = Checkboxes.length;

let CountPlus     = document.getElementById('MultiSelectMaster')?.checked ? 1 : 0;

let Buttons       = document.querySelectorAll('#MultiSelectButtons button');

if ( Count==0 && CountPlus==0 )

{

Buttons.forEach(Button => { Button.disabled = true; } );

MasterCount.disabled  = true;

MasterCount.innerHTML = '<i>no lines selected</i>';

}

else

{

Buttons.forEach(Button => { Button.disabled = false; } );

MasterCount.disabled  = false;

if ( Count==Total )   { MasterCount.innerHTML = 'all of the ' + Total + ' lines selected';  }

else                  { MasterCount.innerHTML = Count + ' of ' + Total + ' lines selected'; }

}

}

window.addEventListener('pageshow', () => {

let Checkboxes = document.querySelectorAll('.MultiSelect');

Checkboxes.forEach(Checkbox => {

MultiSelectRowHilite(Checkbox);

});

});

function PasswordEnableButton() {

const PASSWORD = document.getElementById("PASSWORD");

const BUTTON   = document.getElementById("SignIn-Button");

if (!PASSWORD || !BUTTON) return;

ConsoleLog("PasswordEnableBurtton() Version 1.02");

if ( PASSWORD.value.length < 6 )

{

BUTTON.disabled = true;

}

else

{

BUTTON.disabled = false;

}

}

function PasswordEnableButtonLoad() {

const PASSWORD = document.getElementById("PASSWORD");

const BUTTON   = document.getElementById("SignIn-Button");

if (!PASSWORD || !BUTTON) return;

ConsoleLog("PasswordEnableBurttonLoad() Version 1.02");

PASSWORD.addEventListener("input", PasswordEnableButton);

}

document.addEventListener("DOMContentLoaded", PasswordEnableButton);

document.addEventListener("load",             PasswordEnableButton);

document.addEventListener("DOMContentLoaded", PasswordEnableButtonLoad);

function PasswordMatchColor() {

const PASS1  = document.getElementById("PASS1");

const PASS2  = document.getElementById("PASS2");

const BUTTON = document.getElementById("SignIn-Button");

if (!PASS1 || !PASS2 || !BUTTON) return;

ConsoleLog("PasswordMatchColor() Version 1.02 - loading");

PASS1.addEventListener("input", PasswordMatchColorCheck);

PASS2.addEventListener("input", PasswordMatchColorCheck);

}

function SetPasswordColor(FIELD, STATUS)

{

if (!FIELD) return;

ConsoleLog("SetPasswordColor() Version 1.02");

switch( STATUS )

{

case "GOOD" :  FIELD.classList.remove("PasswordBad");

FIELD.classList.add("PasswordGood");

break;

case "BAD"  :  FIELD.classList.remove("PasswordGood");

FIELD.classList.add("PasswordBad");

break;

default     :  FIELD.classList.remove("PasswordGood");

FIELD.classList.remove("PasswordBad");

break;

}

}

function SetPasswordImage(ID, GOOD)

{

const IMAGE = document.getElementById(ID);

if (!IMAGE) return;

ConsoleLog("SetPasswordImage() Version 1.02");

if (GOOD)

{

IMAGE.src = "https://webstorehouse.com/images/fieldvalues/PASSWORD/good.png";

IMAGE.alt = "Yes";

}

else

{

IMAGE.src = "https://webstorehouse.com/images/fieldvalues/PASSWORD/bad.png";

IMAGE.alt = "No";

}

}

function PasswordMatchColorCheck()

{

const PASS1  = document.getElementById("PASS1");

const PASS2  = document.getElementById("PASS2");

const BUTTON = document.getElementById("SignIn-Button");

if (!PASS1 || !PASS2 || !BUTTON ) return;

ConsoleLog("PasswordMatchColorCheck() Version 1.02 - loading");

const P1 = PASS1.value || "";

const P2 = PASS2.value || "";

const HasLength = P1.length >= 8;

const HasUpper  = /[A-Z]/.test(P1);

const HasLower  = /[a-z]/.test(P1);

const HasNumber = /[0-9]/.test(P1);

const HasSymbol = /[^A-Za-z0-9]/.test(P1);

const PassMatch = ( P1===P2 ) && ( P2!=='' );

const Pass1Good  = HasLength && HasUpper && HasLower && HasNumber && HasSymbol;

const Pass2Good  = PassMatch && (P1.substring(0,P2.length) === P2) ;

SetPasswordImage("PasswordLength", HasLength);

SetPasswordImage("PasswordUpper",  HasUpper);

SetPasswordImage("PasswordLower",  HasLower);

SetPasswordImage("PasswordNumber", HasNumber);

SetPasswordImage("PasswordSymbol", HasSymbol);

SetPasswordImage("PasswordMatch",  Pass2Good);

if ( Pass1Good )

{

SetPasswordColor(PASS1, "GOOD");

if ( Pass2Good )

{

SetPasswordColor(PASS2, "GOOD");

BUTTON.disabled = false;

return;

}

}

else

{

SetPasswordColor(PASS1,"default");

}

BUTTON.disabled = true;

if (P2 === "")

{

SetPasswordColor(PASS2,"default");

return;

}

if (P1.substring(0, P2.length) !== P2)

{

SetPasswordColor(PASS2, "BAD");

return;

}

SetPasswordColor(PASS2,"default");

}

document.addEventListener("DOMContentLoaded", PasswordMatchColor);

function PhoneClean( Input ) {

ConsoleLog("PhoneClean() Version 1.41");

Input.value = Input.value.replace(/\./g, "-");

let Digits   = Input.value.replace(/\D/g, "");

let Previous = localStorage.getItem('PreviousPhoneLength');

Digits = Digits.replace(/^[01]/,"");

if (Digits.length>10)              { Digits = Digits.slice(0,10); }

if ( Previous < Input.value.length )

{

if      (Digits.length >= 6)   { Input.value = Digits.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3");    } // DDD-DDD-DDDD

else if (Digits.length >= 3)   { Input.value = Digits.replace(/(\d{3})(\d{0,3})/,        "$1-$2");       } // DDD-DDD

else                           { Input.value = Digits;                                                   }

}

const pattern1 = /^\d{3}-\d{3}-\d{4}$/;     // 555-555-5555 format

const pattern2 = /^\d{10}$/;                // 5555555555 format

if (!pattern1.test(Input.value) && !pattern2.test(Input.value) && Input.value>'' )

{

Input.setCustomValidity('Please enter phone number in 555-555-5555 format');

}

else

{

Input.setCustomValidity('');

}                                  // Clear the custom message if valid

localStorage.setItem('PreviousPhoneLength',Input.value.length);

}

function PhoneCleanSubmit( Input ) {

ConsoleLog("PhoneCleanSubmit() Version 1.41");

PhoneClean( Input );

Input.value = Input.value.replace(/\D/g, "");

Input.value = Input.value.replace(/^[01]/, "");

}

function PhoneInit() {

ConsoleLog("PhoneInit() Version 1.42 has been loaded");

const telInputs = document.querySelectorAll("input[data-phone]");

if (!telInputs.length) return;

ConsoleLog("Phones - Init Version 1.42");

telInputs.forEach(input => {

if ( !input.id )   { input.id = input.name; }

input.type         = "tel";

input.maxLength    = 12;

input.spellcheck   = false;

input.placeholder  = "555-555-5555";

input.autocomplete = "tel";

input.setCustomValidity("Please enter a phone number");

setTimeout(() => PhoneClean(input), 500);

});

}

if ( document.readyState==="loading" )

{

document.addEventListener("DOMContentLoaded", PhoneInit);

}

else

{

PhoneInit();

}

document.addEventListener("input", function(Event) {

const Input = Event.target.closest("input[data-phone]");

if ( !Input ) return;

PhoneClean(Input);

});

const PhotoSizer = document.getElementById("PhotoSizer");

if (PhotoSizer) {

ConsoleLog("PhotoSizer() - Version 1.2");

function applyPhotoWidth(px) {

document.querySelectorAll(".PhotoSizer")

.forEach(img => img.style.width = px + "px");

}

const saved = getCookie("PhotoSizer");

if (saved)   PhotoSizer.value = saved;

applyPhotoWidth(PhotoSizer.value);

PhotoSizer.addEventListener("change", () => {

const size = PhotoSizer.value;

applyPhotoWidth(size);

setCookie("PhotoSizer", size);

});

}

function WSHredirect() {

const currentUrl = window.location.href;

const newUrl = currentUrl.replace(window.location.hostname, 'webstorehouse.com');

window.location.href = newUrl;

}

document.addEventListener('DOMContentLoaded', function() {

let signInButton = document.getElementById('SignIn-Button');

if (signInButton) {

signInButton.addEventListener('click', function() {

let button = this;

let originalValue      = button.value;

let originalFontSize   = button.style.fontSize;

let originalFontStyle  = button.style.fontStyle;

button.value           = "please wait...";

button.style.fontSize  = "0.85em";        // make font smaller

button.style.fontStyle = "italic";

button.style.pointerEvents = "none";      // disable the button without disabling the form

button.style.transition  = "all 0.5s ease"; // Smooth transition

setTimeout(function() {

button.value           = originalValue;

button.style.fontSize  = originalFontSize;

button.style.fontStyle = originalFontStyle;

button.style.pointerEvents = "auto";

}, 3000);

});

}

let signInMiniButton = document.getElementById('SignIn-MiniButton');

if (signInMiniButton) {

signInMiniButton.addEventListener('click', function() {

this.value = "okay, please wait...";

});

}

});

function StatusLabelAdjust() {

ConsoleLog("StatusLabelAdjust Version 1.5");

document.querySelectorAll("input[name='STATUS']").forEach(function(radio){

var label = document.querySelector("label[for='" + radio.id + "']");

if (!label) return;

if (radio.id === "STATUS_D") {

label.innerHTML = radio.checked ? "&nbsp;Deleted"   : "&nbsp;Delete";

}

if (radio.id === "STATUS_R") {

label.innerHTML = radio.checked ? "&nbsp;Archived"  : "&nbsp;Archive";

}

if (radio.id === "STATUS_C") {

label.innerHTML = radio.checked ? "&nbsp;Cancelled" : "&nbsp;Cancel";

}

});

}

document.addEventListener("change", function(event){

if (event.target && event.target.name === "STATUS") {

StatusLabelAdjust();

}

});

document.addEventListener("DOMContentLoaded", function(){

StatusLabelAdjust();

});

document.addEventListener("click", function( EVENT )

{

const OPEN = document.querySelector(".StickyNote.Open");

if ( OPEN )

{

StickyNoteClose(OPEN);

return;

}

const STICKYNOTE = EVENT.target.closest(".StickyNote");

if ( !STICKYNOTE )    return;

StickyNoteOpen(STICKYNOTE);

});

function StickyNoteOpen( STICKYNOTE )

{

const RECT   = STICKYNOTE.getBoundingClientRect();

const WIDTH  = 400;

STICKYNOTE.style.position = "fixed";

STICKYNOTE.style.left     = "50%";

STICKYNOTE.style.top      = RECT.top + "px";

STICKYNOTE.style.width    = WIDTH + "px";

STICKYNOTE.style.height   = "auto";

const HEIGHT = STICKYNOTE.scrollHeight;

const SCALEX = RECT.width  / WIDTH;

const SCALEY = RECT.height / HEIGHT;

STICKYNOTE.dataset.scaleX = SCALEX;

STICKYNOTE.dataset.scaleY = SCALEY;

STICKYNOTE.style.transform = "translateX(-50%) scale(" + SCALEX + "," + SCALEY + ")";

STICKYNOTE.classList.add("Open");

STICKYNOTE.offsetWidth;

STICKYNOTE.style.transform = "translateX(-50%) scale(1,1)";

ConsoleLog("StickyNoteOpen() Version 1.3 - opened");

}

function StickyNoteClose( STICKYNOTE )

{

if ( STICKYNOTE.dataset.closing=="Y" )    return;

STICKYNOTE.dataset.closing = "Y";

const SCALEX = STICKYNOTE.dataset.scaleX;

const SCALEY = STICKYNOTE.dataset.scaleY;

STICKYNOTE.style.transform = "translateX(-50%) scale(" + SCALEX + "," + SCALEY + ")";

STICKYNOTE.addEventListener("transitionend", function StickyNoteFinished( EVENT )

{

if ( EVENT.target != STICKYNOTE )             return;

if ( EVENT.propertyName != "transform" )      return;

STICKYNOTE.removeEventListener("transitionend", StickyNoteFinished);

STICKYNOTE.classList.remove("Open");

STICKYNOTE.style.position  = "";

STICKYNOTE.style.left      = "";

STICKYNOTE.style.top       = "";

STICKYNOTE.style.width     = "";

STICKYNOTE.style.height    = "";

STICKYNOTE.style.transform = "";

delete STICKYNOTE.dataset.scaleX;

delete STICKYNOTE.dataset.scaleY;

delete STICKYNOTE.dataset.closing;

});

ConsoleLog("StickyNoteClose() Version 1.3 - closed");

}

ConsoleLog("TopScrollFunction() Version 1.01 has been loaded");

window.onscroll = function()

{

TopScrollFunction()

};

function TopScrollFunction()

{

const Check = document.getElementById("TopScrollButton");

if (!Check)       return; // Exit early if button is not found

if (document.body.scrollTop > 240 || document.documentElement.scrollTop > 240)

{

document.getElementById("TopScrollButton").style.display = "block";

}

else

{

document.getElementById("TopScrollButton").style.display = "none";

}

}

function TopScrollButton()                // When the user clicks on the button, scroll to the top of the document

{

ConsoleLog("TopScrollButton() Version 1.01");

document.body.scrollTop = 0;

document.documentElement.scrollTop = 0;

}

document.addEventListener('DOMContentLoaded', function() {

const urlInputs = document.querySelectorAll('input[type="url"]');

if (urlInputs.length === 0) return; // Exit early if none found

ConsoleLog("Urls - EventListener Version 1.1");

urlInputs.forEach(function(urlInput) {

urlInput.addEventListener('blur', function() {

const trimmedValue = urlInput.value.trim();

if (trimmedValue && !trimmedValue.startsWith('http://') && !trimmedValue.startsWith('https://')) {

urlInput.value = 'https://' + trimmedValue;

}

});

});

});

function UsernameShrink() {

const Input = document.getElementById("USERNAME");

if (!Input) return;

ConsoleLog("UsernameShrink() Version 1.01 - loaded");

const MaxSize = 24;

const MinSize = 11;

let Size = MaxSize;

Input.style.fontSize = Size + "px";

while (Input.scrollWidth > Input.clientWidth && Size > MinSize) {

Size--;

Input.style.fontSize = Size + "px";

}

}

document.addEventListener("DOMContentLoaded", function() {

UsernameShrink();

const Input = document.getElementById("USERNAME");

if (Input) {

Input.addEventListener("input", UsernameShrink);

window.addEventListener("resize", UsernameShrink);

}

});

function ZipCodeClean( Input )  {

ConsoleLog("ZipCodeClean() Version 1.2");

Input.value = Input.value.replace(/\D/g, "");

if (Input.value.length > 5)      { Input.value = Input.value.substring(0, 5); }

const pattern = /^\d{5}$/; // Example pattern: 12345

if (!pattern.test(Input.value))  { Input.setCustomValidity('Please enter a 5-digit zip code'); }

else                             { Input.setCustomValidity('');                                      }

}

document.addEventListener("DOMContentLoaded", () => {

const zipcodeInputs = document.querySelectorAll("input[data-zipcode]");

if (!zipcodeInputs.length) return;

ConsoleLog("ZipCodes - EventListener Version 1.2");

zipcodeInputs.forEach(input => {

if ( !input.id )   { input.id = input.name; }

input.type         = "text";

input.spellcheck   = false;

input.placeholder  = "55555";

input.autocomplete = "postal-code";

input.setCustomValidity("Please enter a zip code");

input.addEventListener("input", () => ZipCodeClean(input));

setTimeout(() => ZipCodeClean(input), 500);

});

});

const ZoomerRange = document.getElementById("ZoomerRange");

const ZoomerValue = document.getElementById("ZoomerValue");

if (ZoomerRange && ZoomerValue) {

ConsoleLog("Zoomer() - Version 1.4");

const SavedZoomer = getCookie("Zoomer");

if (SavedZoomer) {

document.body.style.zoom = SavedZoomer + "%";

ZoomerRange.value = SavedZoomer;

ZoomerValue.textContent = `${SavedZoomer}%`;

}

ZoomerRange.addEventListener("input", () => {

ZoomerValue.textContent = `${ZoomerRange.value}%`;

});

ZoomerRange.addEventListener("change", () => {

const ZoomerLevel = ZoomerRange.value;

ConsoleLog(`Detected that Zoomer level was changed to: ${ZoomerLevel}`);

document.body.style.zoom = ZoomerLevel + "%"; // Match buttons' behavior

document.cookie = "Zoomer=" + ZoomerLevel + ";expires=Fri, 31 Dec 2049 01:00:00 UTC;path=/;";

ZoomerValue.textContent = `${ZoomerLevel}%`;

});

}

