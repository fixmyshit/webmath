function ActionGo( PAGE, ACTION, ID, FIELD='', VALUE='' )  {

let form         = document.createElement('form');

form.method  = 'POST';

form.action  = PAGE;

let input1       = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = ACTION;

let input2       = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'ID';

input2.value = ID;

let input3       = document.createElement('input');

input3.type  = 'hidden';

input3.name  = FIELD;

input3.value = VALUE;

form.appendChild(input1);

form.appendChild(input2);

form.appendChild(input3);

document.body.appendChild(form);

form.submit();

}

function SortOrderGo( SORTORDER )  {

let form         = document.createElement('form');

form.method  = 'POST';

let input1       = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = 'LIST';

let input2       = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'SORTORDER';

input2.value = SORTORDER;

form.appendChild(input1);

form.appendChild(input2);

document.body.appendChild(form);

form.submit();

}

function GoSubmit( Image, Action, Aspect )  {

Image.src                 = "https://webstorehouse.com/images/spinners/gosubmit.gif";

Image.style.pointerEvents = "none";

setTimeout(() => {

let form = document.getElementById('WSHFORM');

if (!form) { console.error("This 'Go' image is not inside a form!"); return; }

let input1   = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = Action;

let input2   = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'ASPECT';

input2.value = Aspect;

form.appendChild(input1);

form.appendChild(input2);

form.submit();

}, 100); // Adjust timing as needed

}

function ConfirmYes( Image, Action  )  {

Image.src                 = "https://webstorehouse.com/images/spinners/spinjump.gif";

Image.style.pointerEvents = "none";

setTimeout(() => {

let form = Image.closest('form');

let input1   = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = Action;

let input2   = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'WSHCONFIRM';

input2.value = 'Yes';

form.appendChild(input1);

form.appendChild(input2);

form.submit();

}, 100); // Adjust timing as needed

}

function AspectGo( Aspect, State )  {

let form         = document.createElement('form');

form.method  = 'POST';

let input1       = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = 'LIST';

let input2       = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'ASPECT_' + Aspect;

input2.value = State;

form.appendChild(input1);

form.appendChild(input2);

document.body.appendChild(form);

form.submit();

}

function ConsoleLog(msg) {

if (typeof SAdev === "function" && SAdev()) {

console.log(msg);

}

}

function setCookie(name, value, days=90 ) {

let expires = "";

if (days) {

let date = new Date();

date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

expires = "; expires=" + date.toUTCString();

}

document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; Secure; SameSite=Strict";

}

function getCookie(name) {

return getCookies()[name] || null;

}

function getCookies() {

return Object.fromEntries(

document.cookie.split(';').map(cookie => {

let [name, ...rest] = cookie.trim().split('=');

return [name, decodeURIComponent(rest.join('='))];

})

);

}

document.addEventListener("DOMContentLoaded", () => {

const DebugBlock = document.getElementById("DebugBlock");

if (!DebugBlock) return;            // Exit early if the toolbar doesn't exist

ConsoleLog("DebugBlock() Version 1.1");

let offsetX, offsetY, isDragging = false;

restorePosition("DebugBlock");

DebugBlock.addEventListener("mousedown", (e) => {

isDragging = true;

offsetX = e.clientX - DebugBlock.getBoundingClientRect().left;

offsetY = e.clientY - DebugBlock.getBoundingClientRect().top;

DebugBlock.style.cursor = "grabbing";

});

window.addEventListener("mousemove", (e) => {

if (!isDragging) return;

let zoomFactor       = document.body.style.zoom ? parseFloat(document.body.style.zoom) / 100 : 1;

let x                = Math.round((e.clientX - offsetX) / zoomFactor);

let y                = Math.round((e.clientY - offsetY) / zoomFactor);

DebugBlock.style.left = `${x}px`;

DebugBlock.style.top  = `${y}px`;

});

window.addEventListener("mouseup", () => {

if (isDragging) {

+            savePosition("DebugBlock");        }

isDragging = false;

DebugBlock.style.cursor = "grab";

});

restorePosition();

});

function ImageNotFound(MyImage)

{ MyImage.src="https://webstorehouse.com/images/ImageNotFound.gif"; }

function ImageError(MyImage)

{ MyImage.src="https://webstorehouse.com/images/ImageError.png"; }

function PhotoMissing(MyImage)

{ MyImage.src="https://webstorehouse.com/images/NoImageAvailable.png"; }

function PhotoNotAvailable(MyImage)

{ MyImage.src="https://webstorehouse.com/images/PhotoNotAvailable.png"; }

function SetImage(ImageID,NewSource)

{document.getElementById(ImageID).src=NewSource; }

function SetImageSource(ImageID,NewSource)

{document.getElementById(ImageID).src=NewSource; }

function OpenFileURL( FileURL, Target='_blank' )  { window.open(FileURL,Target); }

ConsoleLog("PageFetch() Version 1.06 has been loaded");

let PageFetchInPopState = false;

async function PageFetch( imgElement, myPage, myAction=null, myId=0 ) {

ConsoleLog("PageFetch() Version 1.07 - " + myPage + "/" + myAction + " " + myId );

let targetUrl = myAction ? myPage + "/" + myAction : myPage;      // if action is not null append it to the page

PageFetchSpinner(imgElement,"pagefetch.gif");

setTimeout(async () => {

const FADE_SELECTOR = "#WSHpagefetch";

let url;

try { url = new URL(targetUrl, window.location.href); }

catch { window.location.href = targetUrl; return; }

if (url.origin !== window.location.origin) {

window.location.href = targetUrl;

return;

}

let html;

try {

html = await PageFetchGet(url.href);

} catch {

window.location.href = targetUrl;

return;

}

if (!PageFetchRender(html, FADE_SELECTOR, imgElement)) { window.location.href = targetUrl; return; }

if (!PageFetchInPopState)

history.pushState({}, "", url.href);

}, 200); // waitt 2/10 seconds

}

async function PageFetchAction( imgElement, myAction, myId=0 ) {

ConsoleLog("PageFetchAction() Version 1.07 - " + myAction + " " + myId );

PageFetchSpinner(imgElement,"pagefetchaction.gif");

setTimeout(async () => {

const TARGET_SELECTOR = "#WSHpagefetch";

const targetEl = document.querySelector(TARGET_SELECTOR);

if (!targetEl) return;

const formData = new FormData();

formData.append("ACTION", myAction);

formData.append("ID",     myId);

let html;

try {

html = await PageFetchPost(window.location.href, formData);

} catch (e) {

const f = document.createElement("form");

f.method = "POST";

f.action = window.location.href;

const i1 = document.createElement("input");

i1.type = "hidden";

i1.name = "ACTION";

i1.value = myAction;

f.appendChild(i1);

const i2 = document.createElement("input");

i2.type = "hidden";

i2.name = "ID";

i2.value = myId;

f.appendChild(i2);

document.body.appendChild(f);

f.submit();

return;

}

PageFetchRender(html, TARGET_SELECTOR, imgElement);

}, 200); // 2/10 second

}

async function PageFetchChoice( imgElement, myFIELD, myVALUE ) {

ConsoleLog("PageFetchChoice() version 1.07 - " + myFIELD + ":" + myVALUE);

PageFetchSpinner(imgElement,"pagefetchchoice.gif");

setTimeout(async () => {

const TARGET_SELECTOR = "#WSHpagefetch";

const targetEl = document.querySelector(TARGET_SELECTOR);

if (!targetEl) return;

const formData = new FormData();

formData.append(myFIELD,myVALUE);

let html;

try {

html = await PageFetchPost(window.location.href, formData);

} catch (e) {

const f = document.createElement("form");

f.method = "POST";

f.action = window.location.href;

const i = document.createElement("input");

i.type = "hidden";

i.name = myFIELD;

i.value = myVALUE;

f.appendChild(i);

document.body.appendChild(f);

f.submit();

return;

}

PageFetchRender(html, TARGET_SELECTOR, imgElement);

}, 200); // 2/10 second

}

async function PageFetchForm( imgElement )

{

ConsoleLog("PageFetchForm() version 1.07");

PageFetchSpinner(imgElement,"pagefetchform.gif");

setTimeout(async () => {

const TARGET_SELECTOR = "#WSHpagefetch";

const targetEl = document.querySelector(TARGET_SELECTOR);

if (!targetEl) return;

let form = imgElement?.closest ? imgElement.closest("form") : null;

if (!form) {

ConsoleLog("PageFetchForm: no FORM found");

return;

}

const action = form.action || window.location.href;

const method = (form.method || "GET").toUpperCase();

let html;

try {

if (method === "GET") {

const url = new URL(action, window.location.href);

const params = new URLSearchParams(new FormData(form));

url.search = params.toString();

html = await PageFetchGet(url.href);

history.pushState({}, "", url.href);

} else {

const formData = new FormData(form);

html = await PageFetchPost(action, formData);

}

} catch (e) {

form.submit();

return;

}

PageFetchRender(html, TARGET_SELECTOR, imgElement);

}, 200);

}

function PageFetchSpinner(imgElement, spinnerImage, scale=0.5)

{

if (!imgElement || !imgElement.width || !imgElement.height) return;

imgElement.width  = Math.round(imgElement.width  * scale);

imgElement.height = Math.round(imgElement.height * scale);

imgElement.src    = "https://webstorehouse.com/images/spinners/" + spinnerImage;

}

async function PageFetchGet(url)

{

const res = await fetch(url, { credentials: "same-origin" });

if (!res.ok) throw new Error("HTTP " + res.status);

return await res.text();

}

async function PageFetchPost(url, formData)

{

const res = await fetch(url, {

method: "POST",

credentials: "same-origin",

headers: { "X-WSH-Partial": "1" },

body: formData

});

if (!res.ok) throw new Error("HTTP " + res.status);

return await res.text();

}

function PageFetchRender_WithoutAutoTopScroll(html, targetSelector="#WSHpagefetch")

{

const targetEl = document.querySelector(targetSelector);

if (!targetEl) return false;

const doc = new DOMParser().parseFromString(html, "text/html");

const extracted = doc.querySelector(targetSelector);

if (extracted) {

targetEl.innerHTML = extracted.innerHTML;

document.title = doc.title || document.title;

}

else {

targetEl.innerHTML = html; // treat response as payload fragment

}

if (typeof window.WSHpagefetchInit === "function") window.WSHpagefetchInit();

return true;

}

function PageFetchRender(html, targetSelector="#WSHpagefetch", buttonElement=null )

{

const targetEl = document.querySelector(targetSelector);

if (!targetEl) return false;

const doc = new DOMParser().parseFromString(html, "text/html");

const extracted = doc.querySelector(targetSelector);

if (extracted) {

targetEl.innerHTML = extracted.innerHTML;

document.title = doc.title || document.title;

}

else {

targetEl.innerHTML = html; // treat response as payload fragment

}

if (typeof window.WSHpagefetchInit === "function") window.WSHpagefetchInit();

PageFetchScrollTop(buttonElement);

return true;

}

function PageFetchScrollTop( buttonElement=null )   // If user was scrolled down, go back to top

{

if (window.scrollY <= 0) return;

if (buttonElement) {

if (buttonElement.tagName === "BUTTON") return;

if (buttonElement.tagName === "IMG") {

window.scrollTo(0, 0);

return;

}

}

window.scrollTo(0, 0);

}

window.addEventListener("popstate", async function () {

const TARGET_SELECTOR = "#WSHpagefetch";

let html;

try {

html = await PageFetchGet(window.location.href);

}

catch {

window.location.reload();

return;

}

PageFetchRender(html, TARGET_SELECTOR);

});

function savePosition(id) {

const Element = document.getElementById(id);

if (!Element) return;

const X = Element.offsetLeft;

const Y = Element.offsetTop;

setCookie( (id+"XY"), (X+','+Y) );

}

function restorePosition(id) {

const Element = document.getElementById(id);

if (!Element) return;

const SavedXY = getCookie(id + "XY");

if (!SavedXY) return;

const [SavedX, SavedY]  = SavedXY.split(",").map(Number);

if ( !isNaN(SavedX) && !isNaN(SavedY) )

{

Element.style.left = SavedX + "px";

Element.style.top  = SavedY + "px";

}

}

function resetPositionToDefault(id, defaultX = 10, defaultY = 10) {

ConsoleLog("Attempting to reset position for " + id + " to " + defaultX + "x" + defaultY);

const Element = document.getElementById(id);

if (!Element) return;

Element.style.left = defaultX + "px";

Element.style.top  = defaultY + "px";

setCookie( (id+"XY"), (defaultX+','+defaultY) );

ConsoleLog("Position for " + id + " has been reset to " + defaultX + "," + defaultY);

}

function PrintWindow()       { window.print(); CheckWindowStateX(); }

function CheckWindowState()  { if (document.readyState=="complete") { window.close(); } else { setTimeout("CheckWindowState()", 2000); } }

function PrintPage() {

var PrintButton = document.getElementById("PrintButton");

PrintButton.style.visibility = 'hidden';

window.print();

PrintButton.style.visibility = 'visible';

}

function RedirectWithPost(url, data) {

const form = document.createElement('form');

form.method = 'post';

form.action = url;

for (const key in data) {

if (data.hasOwnProperty(key)) {

const hiddenField = document.createElement('input');

hiddenField.type = 'hidden';

hiddenField.name = key;

hiddenField.value = data[key];

form.appendChild(hiddenField);

}

}

document.body.appendChild(form);

form.submit();

}

function SAmode(mode,value) {

document.cookie="SA" + mode + "=" + value + ";Expires=Fri, 31 Dec 2049 01:00:00 UTC;Path=/;Secure;SameSite=Lax;"; // Strict;";

document.location.reload(true);

}

function SAdev() {

return document.cookie.includes("SAdev=Y");

}

function SApurplepage() {

window.open('/samodes','samodes','location=0,menubar=0,scrollbars=0,status=0,titlebar=0,toolbar=0,height=400');

}

function SAtoolbarAppend( NewContent, AddWidth=18 )

{

const SAtoolbar = document.getElementById("SAtoolbar");        /* document.querySelector(".SAtoolbar"); */

if (SAtoolbar)

{

SAtoolbar.insertAdjacentHTML("beforeend",NewContent);

}

}

document.addEventListener("DOMContentLoaded", () => {

const SAtoolbar = document.getElementById("SAtoolbar");

if (!SAtoolbar) return;            // Exit early if the toolbar doesn't exist

ConsoleLog("SAtoolbar() Version 1.1");

let offsetX, offsetY, isDragging = false;

restorePosition("SAtoolbar");

SAtoolbar.addEventListener("mousedown", (e) => {

isDragging = true;

offsetX = e.clientX - SAtoolbar.getBoundingClientRect().left;

offsetY = e.clientY - SAtoolbar.getBoundingClientRect().top;

SAtoolbar.style.cursor = "grabbing";

});

window.addEventListener("mousemove", (e) => {

if (!isDragging) return;

let zoomFactor       = document.body.style.zoom ? parseFloat(document.body.style.zoom) / 100 : 1;

let x                = Math.round((e.clientX - offsetX) / zoomFactor);

let y                = Math.round((e.clientY - offsetY) / zoomFactor);

SAtoolbar.style.left = `${x}px`;

SAtoolbar.style.top  = `${y}px`;

});

window.addEventListener("mouseup", () => {

if (isDragging) {

+            savePosition("SAtoolbar");        }

isDragging = false;

SAtoolbar.style.cursor = "grab";

});

restorePosition();

});

function SAtoolbarGo( PAGE, ACTION, ID, FIELD='', VALUE='' )  {

let form         = document.createElement('form');

form.method  = 'POST';

form.action  = PAGE;

let input1       = document.createElement('input');

input1.type  = 'hidden';

input1.name  = 'ACTION';

input1.value = ACTION;

let input2       = document.createElement('input');

input2.type  = 'hidden';

input2.name  = 'ID';

input2.value = ID;

let input3       = document.createElement('input');

input3.type  = 'hidden';

input3.name  = FIELD;

input3.value = VALUE;

form.appendChild(input1);

form.appendChild(input2);

form.appendChild(input3);

document.body.appendChild(form);

form.submit();

}

function TimeOut(Minutes)

{ if (Minutes>0) { setTimeout("TimeOutLogoff("+Minutes+")",Minutes*60000+10000); } }

function TimeOutLogoff(Minutes)

{window.location="https://webstorehouse.com/login/?ACTION=TIMEOUT&TIMEOUT=" + Minutes; }

function ShowThis(MyID) {

var ele = document.getElementById(MyID);

ele.style.display = "block";

ele.style.visibility = "visible";

}

function HideThis(MyID) {

var ele = document.getElementById(MyID);

ele.style.display = "none";

ele.style.visibility = "visible";

}

function ShowDivision(DivisionID) {

var ele = document.getElementById(DivisionID);

if (ele.style.display == "none")

{ ele.style.display = "block"; }

else

{ ele.style.display = "block"; }

}

function SwapThese(MyID1,MyID2) {

var ele1 = document.getElementById(MyID1);

var ele2 = document.getElementById(MyID2);

if (ele1.style.display == "none")

{ ele1.style.display = "block";

ele2.style.display = "none"; }

else

{ ele1.style.display = "none";

ele2.style.display = "block"; }

}

