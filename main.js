const content = document.querySelector(".content");

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
          displayOne(button.id);
        });
      });
    });
}

function back() {
  const backButtons = document.querySelector(".backButtons");
  console.log(backButtons);
  backButtons.forEach((button) => {
    button.addEventListener("click", () => displayAll());
  });
}

function displayOne(id) {
  let loader = ` <div class="loader"></div> `;
  content.innerHTML = loader;
  fetch("http://localhost/cyclisterie/?type=velo&action=showApi&id=" + id)
    .then((response) => response.json())
    .then((monVelo) => {
      content.innerHTML = templateAvis(monVelo);
    });
}

function displayAvis(arrayAvis) {
  let mesAvis = "";
  arrayAvis.forEach((avis) => {
    let template = `<div class="card p-2 m-2  ">
    <h3>${avis.author.name}</h3>
    <p>${avis.content}</p>
    </div>`;
    mesAvis += template;
  });
  return mesAvis;
}

function simpleTemplate(velo) {
  template = `<div class="mt-5 me-5">
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
  <a href="${back()}" class="btn btn-secondary backButtons">Retour</a>
  <div class=""> 
  ${displayAvis(velo.avis)}                        
  </div>
  </div>`;
  return template;
}

displayAll();
