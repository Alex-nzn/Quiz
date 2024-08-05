//Нахожу все карточки и скрываю их
const cards = document.querySelectorAll(".card");
cards.forEach(function (item) {
  item.classList.add("hidden");
});

let index = 0; //Индекс карточки
let currentCard = 0; //Текущая карточка (Для линии прогресса)

cards[index].classList.remove("hidden");
cards[index].classList.add("visible");

line(); //Функция линии прогресса

window.addEventListener("click", function (e) {
  if (e.target.closest(".next")) {
    const result = checked(cards[index]); //Проверяю выбран ли ответ
    const dataAnswers = cards[index].querySelector("[data-answers]"); //Нахожу область с инпутами

    if (result) {
      line("next");

      setTimeout(function () {
        cards[index].classList.remove("visible");

        setTimeout(function () {
          cards[index].classList.add("hidden");
          index++;
          cards[index].classList.remove("hidden");

          setTimeout(function () {
            cards[index].classList.add("visible");
          }, 100);
        }, 500);

        dataAnswers.classList.remove("required");
      }, 500);
    } else {
      dataAnswers.classList.add("required"); //Если не выбран ответ добавляю красную рамку
    }
  }

  if (e.target.closest(".prev")) {
    line("prev");
    setTimeout(function () {
      if (index == 0) return;

      cards[index].classList.remove("visible");
      setTimeout(function () {
        cards[index].classList.add("hidden");
        index--;
        cards[index].classList.remove("hidden");

        setTimeout(function () {
          cards[index].classList.add("visible");
        }, 100);
      }, 500);
    }, 500);
  }
});

const checked = function (card) {
  //Проверка на checked
  const inputsRadio = card.querySelectorAll('input[type="radio"]');
  if (inputsRadio.length > 0) {
    for (let input of inputsRadio) if (input.checked == true) return true;
  }

  //Проверка на checkbox
  const inputsCheckbox = card.querySelectorAll('input[type="checkbox"]');
  if (inputsCheckbox.length > 0) {
    for (let input of inputsCheckbox) if (input.checked == true) return true;
  }
};

function line(direction = "start") {
  if (direction == "next") {
    currentCard++;
  } else if (direction == "prev") {
    currentCard--;
  }

  const progressNum = document.querySelectorAll(".progress__head span"); //Span прогресса
  const progressActive = document.querySelectorAll(".line-active"); //Линия прогресса
  const cardsProgress = document.querySelectorAll("[data-progress]").length; //количество карточек с линией прогресса
  const progress = Math.round((currentCard * 100) / cardsProgress); //Число прогресса

  progressNum.forEach(function (item) {
    item.innerText = progress + "%";
  });
  progressActive.forEach(function (item) {
    item.style.width = progress + "%";
  });
}

//Ставлю маску на импут ввода телефона
mask('[type="tel"]');

const submitForm = document.querySelector("#btn__form");
const telInput = document.querySelector('[type="tel"]');

submitForm.onclick = function () {
  if (telInput.value == "+" || telInput.value.length < 8) {
    telInput.value = "";
  }
};

const politica = document.querySelector("#policy");
console.log(politica);
politica.addEventListener("focus", function () {
  politica.closest("label").classList.add("hovered");
});

politica.addEventListener("blur", function () {
  politica.closest("label").classList.remove("hovered");
});
