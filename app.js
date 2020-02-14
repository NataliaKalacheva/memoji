(function() {
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

  // events

  renderMemoji(memoji);

  box.addEventListener("click", e => {
    e.target.parentNode.classList.contains("card__inner")
      ? showCard.call(e.target.parentNode)
      : (stop = true);
  });

  // handlers

  function isEqual() {
    if (currentCards.length > 2) {
      currentCards = [];
    }
    if (currentCards.length === 2) {
      if (currentCards[0].memoji() === currentCards[1].memoji()) {
        (currentCards[0].equal = true), (currentCards[1].equal = true);
        chosenCards = chosenCards.concat([currentCards[0], currentCards[1]]);
        markEqual(currentCards[0], currentCards[1]);
        currentCards = [];
        return true;
      } else {
        (currentCards[0].equal = false), (currentCards[1].equal = false);
        chosenCards = chosenCards.concat([currentCards[0], currentCards[1]]);
        markOdd(currentCards[0], currentCards[1]);
        currentCards = [];
        return false;
      }
    }
  }

  function markEqual() {
    [].forEach.call(arguments, function(card) {
      card.back().style.background = "#5AD66F";
      card.el.classList.add("default");
    });
  }

  function markOdd() {
    [].forEach.call(arguments, function(card) {
      card.back().style.background = "#F44336";
      card.el.classList.add("default");
    });
  }

  function showCard() {
    this.classList.add("default");

    if (chosenCards.length !== 0) {
      chosenCards.forEach(el => {
        if (el.equal === false) {
          el.el.classList.remove("show", "default");
          el.back().style.background = "#ffffff";
          delete el.equal;
        }
      });
    }

    this.classList.toggle("show");

    currentCards.push({
      el: this,
      back: function() {
        return this.el.querySelector(".back");
      },
      memoji: function() {
        return this.back().innerText;
      }
    });

    isEqual();
  }

  function renderMemoji(arr) {
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
})();
