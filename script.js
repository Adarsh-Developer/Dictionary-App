const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchBar = document.querySelector(".search__bar");
const searchBtn = document.querySelector(".search__btn");
const wordName = document.querySelector(".word__name");
const detailOne = document.querySelector(".detail-1");
const wordDefinition = document.querySelector(".word__definition");
const wordExample = document.querySelector(".word__example");
const wordAudio = document.querySelector(".word__audio");
const sound = document.querySelector(".sound");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
    display()
});


function display(){
  const keyWord = searchBar.value;

  fetch(`${url}${keyWord}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      wordName.innerHTML = data[0].word;

      detailOne.innerHTML = data[0].meanings[0].partOfSpeech || "";

      wordDefinition.innerHTML =
        'DEFINITION: ' + data[0].meanings[0].definitions[0].definition || "";

      wordExample.innerHTML = data[0].meanings[0].definitions[0].example || "";

      if(wordExample.innerHTML !== ""){
        wordExample.style.display = "block"
      }else{
        wordExample.style.display = "none"
      }

      if(wordDefinition.innerHTML !== ""){
        wordDefinition.style.display = "block"
      }else{
        wordDefinition.style.display = "none"
      }

      sound.setAttribute(
        "src",
        `${data[0].phonetics[0].audio}` ||
          `${data[0].phonetics[1].audio}` ||
          `${data[0].phonetics[2].audio}` ||
          `${data[0].phonetics[3].audio}` ||
          `${data[0].phonetics[4].audio}` ||
          `${data[0].phonetics[5].audio}` ||
          `${data[0].phonetics[6].audio}`
      );

      wordAudio.addEventListener("click", function () {
        sound.play();
      });
    })
    .catch(() => {
      wordName.innerHTML = "No word found";
      detailOne.innerHTML = ""
      wordDefinition.innerHTML = ""
      wordExample.innerHTML = ""
    });
}