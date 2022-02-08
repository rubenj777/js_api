const content = document.querySelector(".content");

///////////////////////////
/// METHODES AFFICHAGE ////
///////////////////////////

function displayAll() {
  fetch("http://localhost/cyclisterie/?type=velo&action=indexApi")
    .then((response) => response.json())
    .then((velos) => {
      content.innerHTML = "";
      velos.forEach((velo) => {
        content.innerHTML += simpleTemplate(velo);
      });
      const seeButtons = document.querySelectorAll(".seeButton");
      seeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          displayOne(button.id);
        });
      });
    });
}

function displayOne(id) {
  let loader = ` <div class="loader"></div> `;
  content.innerHTML = loader;
  fetch("http://localhost/cyclisterie/?type=velo&action=showApi&id=" + id)
    .then((response) => response.json())
    .then((monVelo) => {
      content.innerHTML = templateAvis(monVelo);
      const backButton = content.querySelector(".backButton");
      backButton.addEventListener("click", () => {
        displayAll();
      });
    });
}

function displayAvis(arrayAvis) {
  let mesAvis = "";
  arrayAvis.forEach((avis) => {
    let template = `<div class="card p-2 m-2  ">
    <strong>${avis.author.name}</strong>
    <p>${avis.content}</p>
    </div>`;
    mesAvis += template;
  });
  return mesAvis;
}

///////////////////////////
//// METHODE CREATION /////
///////////////////////////
function createVelo() {}

/////////////////////////
/////// TEMPLATES ///////
/////////////////////////

function simpleTemplate(velo) {
  template = `<div class="mt-5 me-5">
  <h3>${velo.name}</h3>
  <img width="250px" height="250px" src="http://localhost/cyclisterie/images/${velo.image}">
  <p>${velo.description}</p>
  <button id="${velo.id}" class="btn btn-success seeButton">Voir le velo</button>
  </div>`;
  return template;
}

function templateAvis(velo) {
  template = `
  <div class="">
  <button class="btn btn-secondary mb-5 backButton">Retour</button>
  <h3>${velo.name}</h3>
  <p>${velo.description}</p>
  <img width="250px" height="250px" src="http://localhost/cyclisterie/images/${
    velo.image
  }">
  <div class=""> 
  ${displayAvis(velo.avis)}                        
  </div>
  </div>`;
  return template;
}

///////////////
//// CODE /////
///////////////

displayAll();
