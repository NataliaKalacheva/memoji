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
  let cards;

  // events

  renderMemoji(memoji);

  cards.forEach(function(card) {
    card.addEventListener("click", showCard);
  });

  // handlers

  function showCard() {
    this.classList.toggle("show");
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
        <span class="memoji">${el}</span>
      </div>
    </div>
  </div>`;
  }
})();
