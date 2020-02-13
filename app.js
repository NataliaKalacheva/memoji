(function() {
  // variables

  let cards = Array.from(document.querySelectorAll(".card__inner"));

  // events

  cards.forEach(function(card) {
    card.addEventListener("click", showCard);
  });

  // handlers

  function showCard() {
    this.classList.toggle("show");
  }
})();
