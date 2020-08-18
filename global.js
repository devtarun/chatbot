'use strict';

var trigger = [
    ["hi", "hey", "hello"],
    ["how are you", "how is life", "how are things"],
    ["what are you doing", "what is going on"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you"],
    ["your name please", "your name", "may i know your name", "what is your name"],
    ["i love you"],
    ["happy", "good"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice", "thanks", "thank you"],
    ["bye", "good bye", "goodbye", "see you later"],

    // INTERVIEW INDEX QUEST
    ["what is your total experience", "experience"],
    ["technology you have worked on"]
], reply = [
    ["Hi", "Hey", "Hello"],
    ["Fine", "Pretty well", "Fantastic"],
    ["Nothing much", "About to go to sleep", "Can you guest?", "I don't know actually"],
    ["I am 26 yrs old. 😁"],
    ["I am just a bot", "I am a bot. What are you?"],
    ["Tarun", "My God"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV"],
    ["I will", "What about?"],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself", "You are welcome"],
    ["Bye", "Goodbye", "See you later"],

    // INTERVIEW INDEX REPLY
    ["I've a total of 5 years of experience"],
    ["I've worked on many tech stacks like - HTML, CSS, JS, PHP, Angular, Ionic and related frameworks like Codeignitor, Laravel, CakePhp, Angular, Bootstrap, jQuery etc. I've working knowledge of SCSS as well"]

], alternative = ["Haha...", "Eh..."];

var val = '';
var resp = document.querySelector('.resp');
(function(){
    setTimeout(() => {
        resp.innerHTML = 'Hi, I\'m Tarun';
    }, 500);
});

document.getElementById('chat_bx').addEventListener('keypress', e => {
    var key = (e.keyCode ? e.keyCode : e.which);
    if (key === 13) {
        val = e.target.value.toLowerCase();
        resp.classList.add('hidden');
        if(val == "") return;
        setTimeout(() => {
            ai(val);
            resp.classList.remove('hidden');
        }, 500);
    }
});

function ai(data) {
    try {
        var product = data + "=" + eval(data);
    } catch (e) {
        var text = (data.toLowerCase()).replace(/[^\w\s\d]/gi, "");
        text = text.replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "");
        if (compare(trigger, reply, text)) {
            var product = compare(trigger, reply, text);
        } else {
            var product = alternative[Math.floor(Math.random() * alternative.length)];
        }
    }
    resp.innerHTML = product;
    speak(product);
    // resp.value = ""; //clear input value
}

var items;
function compare(t, r, i) {
    var item;
    for (var x = 0; x < t.length; x++) {
        for (var y = 0; y < r.length; y++) {
            if (t[x][y] == i) {
                items = r[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    return item;
}

function speak(string) {
    var utterance = new SpeechSynthesisUtterance();
    utterance.voice = speechSynthesis.getVoices().filter(voice => voice.name == "Agnes")[0];
    utterance.text = string;
    utterance.lang = "en-US";
    utterance.volume = 1; //0-1 interval
    utterance.rate = 1;
    utterance.pitch = 1; //0-2 interval
    speechSynthesis.speak(utterance);
}

