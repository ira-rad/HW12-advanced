const getPlanets = document.getElementById("get_planets");
const getCharactersButtons = document.getElementById("btn--get_charachters");
const aboutСharachters = document.getElementById("about-charachters");
const selectEpisode = document.getElementById("select-episode");

const BASE_URL = "https://swapi.dev/api/";

const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");
const planet = `${BASE_URL}planets/`;

const getFilmUrl = (num) => `${BASE_URL}films/${num}/`;
const toHTTPS = (url) =>
  url[4].toLowerCase() === "s" ? url : url.slice(0, 4) + "s" + url.slice(4);
const getPlanet = (page) =>
  axios.get(`${BASE_URL}planets/?page=${page}`).then((res) => res.data.results);

let currentValue = 1;
let page = 1;
let film;

function sendRequest(url) {
  const newURL = toHTTPS(url);
  return fetch(newURL)
    .then((res) => res.json())
    .catch("console.log");
}

function showElem(elem) {
  elem.style.display = "block";
}

function hideElem(elem) {
  elem.style.display = "none";
}

function showPlanets(data) {
  const containerPlanets = document.querySelector(".container__third--planets");
  containerPlanets.innerHTML = "";
  data.map((planet) => {
    const planetElement = document.createElement("div");
    planetElement.classList.add("planet");
    planetElement.innerHTML = `
      <h3 class="planets__name"> Name of the planet - ${planet.name}</h3>
      <h3 class="planets__name"> Population - ${planet.population}</h3>
      <h3 class="planets__name"> Climate - ${planet.climate}</h3>
      `;
    containerPlanets.appendChild(planetElement);
  });
}

btnNext.addEventListener("click", () => {
  if (page > 5) {
    return;
  }
  page++;
  getPlanet(page).then((res) => showPlanets(res));
});

btnPrev.addEventListener("click", () => {
  if (page <= 1) {
    return;
  }
  page--;
  getPlanet(page).then((res) => showPlanets(res));
});

selectEpisode.addEventListener("click", (e) => {
  currentValue = Number(e.target.value.slice(-1));
});

getCharactersButtons.addEventListener("click", (e) => {
  sendRequest(getFilmUrl(currentValue)).then((data) => {
    let character = "";
    let i = 0;
    while (i < data.characters.length) {
      i++;
      sendRequest(data.characters[i]).then((aboutCharter) => {
        character += `<div class="character-info">
                                            <h3> Сharacter name - ${aboutCharter.name}. </h3> 
                                            <h3> Birthday- ${aboutCharter.birth_year}. </h3> 
                                            <h3> Gender - ${aboutCharter.gender}. </h3>                            
                                  </div>`;
        aboutСharachters.innerHTML = `${character}`;
      });
    }
  });
});

getPlanets.addEventListener("click", () => {
  showElem(btnNext);
  showElem(btnPrev);
  getPlanet(page).then((res) => showPlanets(res));
});
