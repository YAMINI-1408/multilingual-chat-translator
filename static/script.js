let autoTranslate = false
let toggle = document.getElementById("autoTranslateToggle")

if(toggle){
toggle.addEventListener("change", function(){

autoTranslate = this.checked
applyAutoTranslate()

})
}

function getTime(){

let now = new Date()

let h = now.getHours()
let m = now.getMinutes()

let ampm = h >= 12 ? "PM" : "AM"

h = h % 12
h = h ? h : 12

m = m < 10 ? "0"+m : m

return h + ":" + m + " " + ampm

}
function toggleOptions(msg){

let allOptions = document.querySelectorAll(".options")
allOptions.forEach(opt => opt.style.display = "none")

let options = msg.parentElement.querySelector(".options")
options.style.display = "block"

}

function sendMessage(){

let input = document.getElementById("msgInput")
let chatBox = document.getElementById("chatBox")

let text = input.value.trim()
if(text === "") return

let msg = document.createElement("div")
msg.className = "message sent"

msg.innerHTML = `
<div class="bubble" data-original="${text}">
${text}
</div>
<div class="time">${getTime()}</div>

<div class="options">
<span class="translate" onclick="translateMessage(this)">Translate</span>
<span class="original" onclick="showOriginal(this)">Original</span>
</div>
`

chatBox.appendChild(msg)

input.value = ""
chatBox.scrollTop = chatBox.scrollHeight

showTyping()

setTimeout(()=>{
removeTyping()
startTeluguConversation()
},1200)

}

function startTeluguConversation(){

let chatBox = document.getElementById("chatBox")

let messages = [
"హైదరాబాద్‌లో software job opening ఉంది",
"2 years experience కావాలి",
"resume పంపగలవా",
"walk-in రేపు ఉదయం 10 గంటలకు ఉంది",
"location details పంపుతున్నాను"
]

messages.forEach((text,index)=>{

setTimeout(()=>{

showDots()

setTimeout(()=>{

removeDots()

let msg = document.createElement("div")
msg.className = "message received"

msg.innerHTML = `
<div class="bubble" data-original="${text}">
${text}
</div>
<div class="time">${getTime()}</div>

<div class="options">
<span class="translate" onclick="translateMessage(this)">Translate</span>
<span class="original" onclick="showOriginal(this)">Original</span>
</div>
`

chatBox.appendChild(msg)
chatBox.scrollTop = chatBox.scrollHeight

if(autoTranslate){
let btn = msg.querySelector(".translate")
translateMessage(btn)
}

},400)

},2000*(index+1))

})

}
function showDots(){

let chatBox = document.getElementById("chatBox")

let typing = document.createElement("div")
typing.className = "message received"
typing.id = "dots"

typing.innerHTML = `
<div class="bubble">
<span class="dot"></span>
<span class="dot"></span>
<span class="dot"></span>
</div>
`

chatBox.appendChild(typing)
chatBox.scrollTop = chatBox.scrollHeight

}

function removeDots(){

let dots = document.getElementById("dots")
if(dots) dots.remove()

}

function showTyping(){

let chatBox = document.getElementById("chatBox")

let typing = document.createElement("div")
typing.className = "message received"
typing.id = "typingIndicator"

typing.innerHTML = `
<div class="bubble">
Mini is typing...
</div>
`

chatBox.appendChild(typing)
chatBox.scrollTop = chatBox.scrollHeight

}

function removeTyping(){
let typing = document.getElementById("typingIndicator")
if(typing) typing.remove()
}

function applyAutoTranslate(){

let allBubbles = document.querySelectorAll(".message.received .bubble")

allBubbles.forEach(async bubble => {

let original = bubble.dataset.original

if(autoTranslate){

bubble.innerText = "Translating..."

try{

let res = await fetch("/translate",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({text:original})
})

let data = await res.json()

bubble.innerText = data.translated

}catch{
bubble.innerText = original
}

}else{

bubble.innerText = original

}

})

}

async function translateMessage(btn){

let bubble = btn.parentElement.parentElement.querySelector(".bubble")
let original = bubble.dataset.original

bubble.innerText = "Translating..."

try{

let res = await fetch("/translate",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({text:original})
})

let data = await res.json()

bubble.innerText = data.translated

}catch{
bubble.innerText = original
}

btn.parentElement.style.display = "none"

}

function showOriginal(btn){

let bubble = btn.parentElement.parentElement.querySelector(".bubble")
bubble.innerText = bubble.dataset.original

btn.parentElement.style.display = "none"

}

let chatBox = document.getElementById("chatBox")

chatBox.addEventListener("click", function(e){
if(e.target.classList.contains("bubble")){
toggleOptions(e.target)
}
})

let inputBox = document.getElementById("msgInput")

inputBox.addEventListener("keypress", function(e){
if(e.key === "Enter"){
sendMessage()
}
})
window.onload = function(){

let chatBox = document.getElementById("chatBox")

let msg = document.createElement("div")
msg.className = "message received"

msg.innerHTML = `
<div class="bubble" data-original="Hi Yams 😊">
Hi Yams 😊
</div>
<div class="time">${getTime()}</div>

<div class="options">
<span class="translate" onclick="translateMessage(this)">Translate</span>
<span class="original" onclick="showOriginal(this)">Original</span>
</div>
`

chatBox.appendChild(msg)

}