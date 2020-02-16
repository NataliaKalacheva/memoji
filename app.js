// variables
let memoji = [
  "🐰",
  "🦁",
  "🐷",
  "🐸",
  "🦄",
  "🐞",
  "🐰",
  "🦁",
  "🐷",
  "🐸",
  "🦄",
  "🐞"
];
let box = document.getElementById("box");
let currentCards = [];
let chosenCards = [];
let restartBtn = document.getElementById("result__btn");
let moves = 0;

let timer = {
  el: document.getElementById("timer"),
  min: 01,
  sec: 00,
  initialize() {
    let currentTime;
    timer.sec--;
    if (timer.sec == -01) {
      timer.sec = 59;
      timer.min = timer.min - 1;
    } else {
      timer.min = timer.min;
    }

    if (timer.sec <= 9) {
      timer.sec = "0" + timer.sec;
    }

    currentTime =
      (timer.min <= 9 ? "0" + timer.min : timer.min) + ":" + timer.sec;

    if (timer.el) {
      timer.el.innerHTML = currentTime;
    }

    if (timer.min == "00" && timer.sec == "00") {
      clearInterval(timer.int);
      showResult();
    }
  },
  start() {
    this.el.innerText = `0${this.min}:0${this.sec}`;
    this.int = setInterval(this.initialize, 1000);
  },
  stop() {
    clearInterval(this.int);
    this.min = 01;
    this.sec = 00;
  },
  setTime(min, sec) {
    this.min = min;
    this.sec = sec;
  }
};

// events

renderMemoji(memoji);

box.addEventListener("click", boxHandler);
restartBtn.addEventListener("click", restartHandler);

// handlers

function boxHandler(e) {
  if (e.target.parentNode.classList.contains("card__inner")) {
    showCard.call(e.target.parentNode);
    moves++;
  }

  if (moves === 1) {
    timer.start();
  }

  if (isWinner()) {
    timer.stop();
    showResult();
  }
}

function restartHandler() {
  closeResult();
  timer.stop();
  timer.el.innerText = "00:00";
  renderMemoji(memoji);
  chosenCards = [];
  currentCards = [];
  moves = 0;
}

function isWinner() {
  let cards = Array.from(box.querySelectorAll(".card__inner"));

  let result = cards.every(card => card.classList.contains("success"))
    ? true
    : false;
  return result;
}

function setCurrentCards() {
  if (currentCards.length > 2) {
    currentCards = [];
  }
  if (currentCards.length === 2) {
    isEqual();
  }
}

function isEqual() {
  let prev = currentCards[0];
  let current = currentCards[1];

  if (prev.memoji() === current.memoji()) {
    (prev.equal = true), (current.equal = true);
    chosenCards = chosenCards.concat([prev, current]);
    markEqual(prev, current);
    currentCards = [];
    return true;
  } else {
    (prev.equal = false), (current.equal = false);
    chosenCards = chosenCards.concat([prev, current]);
    markOdd(prev, current);
    currentCards = [];
    return false;
  }
}

function markEqual() {
  [].forEach.call(arguments, function(card) {
    card.el.classList.add("default", "success");
  });
}

function markOdd() {
  [].forEach.call(arguments, function(card) {
    card.el.classList.add("default", "danger");
  });
}

function showCard() {
  this.classList.contains("show")
    ? this.classList.add("close")
    : this.classList.remove("close");
  this.classList.add("default");

  this.classList.toggle("show");

  if (chosenCards.length !== 0) {
    chosenCards.forEach(el => {
      if (el.equal === false) {
        el.el.classList.add("close");
        el.el.classList.remove("show", "default", "danger");
        delete el.equal;
      }
    });
  }

  currentCards.push({
    el: this,
    back: function() {
      return this.el.querySelector(".back");
    },
    memoji: function() {
      return this.back().innerText;
    }
  });

  setCurrentCards();
}

function renderMemoji(arr) {
  box.innerHTML = "";
  let memoji = arr.slice();
  let template = "";

  while (memoji.length > 0) {
    let random = Math.floor(Math.random() * memoji.length);
    template += templateEl(memoji[random]);
    memoji.splice(random, 1);
  }

  box.insertAdjacentHTML("afterbegin", template);
  cards = Array.from(document.querySelectorAll(".card__inner"));
}

function templateEl(el) {
  return `<div class="card">
    <div class="card__inner">
      <div class="front"></div>
      <div class="back">
        ${el}
      </div>
    </div>
  </div>`;
}

function showResult() {
  let result = document.getElementById("modal");

  if (isWinner()) {
    result.querySelector(".result__text").innerHTML = `
    <span class="result__letter">W</span>
    <span class="result__letter">i</span>
    <span class="result__letter">n</span>`;
  } else {
    result.querySelector(".result__text").innerHTML = `
    <span class="result__letter">L</span>
    <span class="result__letter">o</span>
    <span class="result__letter">s</span>
    <span class="result__letter">e</span>`;
  }

  if (result) {
    result.classList.add("show");
  }
}

function closeResult() {
  let result = document.getElementById("modal");

  if (result) {
    result.classList.remove("show");
  }
}
