const getCharactersButtons = document.getElementById("btn--get_charachters");
const aboutСharachters = document.getElementById("about-charachters");
const BASE = "https://swapi.dev/api/";
const getFilmUrl = (num) => `${BASE}films/${num}/`;
const planet = `${BASE}planets/`;
const toHTTPS = (url) =>
  (url[4].toLowerCase() === "s") ? url : url.slice(0, 4) + "s" + url.slice(4);

function sendRequest(url) {
  const newURL = toHTTPS(url);
  return fetch(newURL)
    .then((res) => res.json())
    .catch("console.log");
}

let film;

const selectEpisode = document.getElementById("select-episode");
getCharactersButtons.addEventListener("click", () => {
  var episode = selectEpisode.value;
  switch (episode) {
    case "episode1":
      film = getFilmUrl(1);
      break;
    case "episode2":
      film = getFilmUrl(2);
      break;
    case "episode3":
      film = getFilmUrl(3);
      break;
    case "episode4":
      film = getFilmUrl(4);
      break;
    case "episode5":
      film = getFilmUrl(5);
      break;
    case "episode6":
      film = getFilmUrl(6);
      break;
  }

  sendRequest(film).then((data) => {
        let character = "";
        let i = 0;
        while(i < data.characters.length) {
            i++;
          sendRequest(data.characters[i]).then((characterInf) => {
            character += `<div class="character-info">
                                            <h3> Сharacter name - ${characterInf.name}. 
                                            Birthday- ${characterInf.birth_year}.
                                            Gender - ${characterInf.gender}. </h3>
                            
                                  </div>`;
          aboutСharachters.innerHTML = `${character}`;
          });
        }
        
      });
});

  

function getPlanet(){
    return axios.get(BASE + `planets/`)
    .then((res) => {
        console.log(res.data.results)
        return res.data.results;
        
    });
}
function renderPlanets(planets){
    const containerThirth = document.querySelector('.container__thirth');

    document.getElementById('get_planets').addEventListener('click', () => {  
       
        containerThirth.innerHTML=`
        <button id="prev" class="btn">Prev</button>
        <button id="next" class="btn">Next </button>
        `;
    planets.forEach(planet => {
        const planetElement = document.createElement('div');
        planetElement.innerHTML = `
        <h3 class="planets__name"> Name of the planet - ${planet.name}</h3>
        <h3 class="planets__name"> Population - ${planet.population}</h3>
        <h3 class="planets__name"> Climate - ${planet.climate}</h3>
       
        `;
        containerThirth.append(planetElement);
    });


});
}
getPlanet().then(renderPlanets);


function changePlanets() {
    let currentPage = 1;
    document.getElementById('prev').addEventListener('click', () => {
      if (currentPage < 1) return;
      getUsers(--currentPage).then(renderPlanets);
    });
    document.getElementById('next').addEventListener('click', () => {
      getUsers(++currentPage).then(renderPlanets);
    });
  }

  changePlanets()







