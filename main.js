const content = document.querySelector(".content");

// btn_xml.addEventListener("click", () => display_xml());
// btn_fetch.addEventListener("click", () => display_fetch());
// btn_velos.addEventListener("click", () => display_velos());

// function display_xml() {
//   let request = new XMLHttpRequest();
//   request.open("GET", "http://localhost/cyclisterie/testApi.php");
//   request.onload = () => {
//     let data = JSON.parse(request.responseText);
//     console.log(data);
//   };
//   request.send();
// }

function displayAll() {
  let url = "http://localhost/cyclisterie/?type=velo&action=indexApi";
  fetch(url)
    .then((response) => response.json())
    .then((velos) => {
      content.innerHTML = "";
      velos.forEach((velo) => {
        content.innerHTML += simpleTemplate(velo);
      });
      const seeButtons = document.querySelectorAll(".seeButton");
      seeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          getVelo(button.id);
        });
      });
    });
}

function getVelo(id) {
  fetch("http://localhost/cyclisterie/?type=velo&action=showApi&id=" + id)
    .then((response) => response.json())
    .then((monVelo) => {
      content.innerHTML = templateAvis(monVelo);
    });
}

function displayAvis(arrayAvis) {
  let mesAvis = "";
  arrayAvis.forEach((avis) => {
    let template = `<div class="card">
    <h3>${avis.author.name}</h3>
    <p>${avis.content}</p>
    </div>`;
    mesAvis += template;
  });
  return mesAvis;
}

function simpleTemplate(velo) {
  template = `<div class="mt-5">
  <h3>${velo.name}</h3>
  <img width="250px" src="http://localhost/cyclisterie/images/${velo.image}">
  <p>${velo.description}</p>
  <button id="${velo.id}" class="btn btn-success seeButton">Voir le velo</button>
  </div>`;
  return template;
}

function templateAvis(velo) {
  template = `<div class="">
  <h3>${velo.name}</h3>
  <p>${velo.description}</p>
  <img width="250px" src="http://localhost/cyclisterie/images/${velo.image}">
  <button class="btn btn-secondary back">Retour</button>
  <div class=""> 
  ${displayAvis(velo.avis)}                        
  </div>
  </div>`;
  return template;
}

displayAll();
