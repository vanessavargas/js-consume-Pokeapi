var defaultUrl = "https://pokeapi.co/api/v2/pokemon";
var modal = document.getElementById("myModal");

getPokemons(defaultUrl);

function getPokemons(url) {
  return axios({
    method: "GET",
    url,
    data: {
      limit: 20,
    },
  }).then((response) => {
    createItems(response.data.results);
    createButtons(response.data);
  });
}

function getPokemon(url) {
  return axios({
    method: "GET",
    url,
  }).then((response) => {
    populateModalContent(response.data);
    openModal();
  });
}

function createItems(data) {
  const div = document.getElementById("items");
  div.innerHTML = "";
  for (let item of data) {
    const d = document.createElement("div");
    d.setAttribute("class", "item");
    d.append(createTag("p", `${item.name.toUpperCase()}`));
    d.addEventListener("click", function () {
      getPokemon(defaultUrl + `/${item.name}`);
    });
    div.append(d);
  }
}

function createButtons(data) {
  const div = document.getElementById("buttons");
  div.innerHTML = "";

  if (data.previous) {
    div.append(createButton("Anterior", data.previous));
  }

  if (data.next) {
    div.append(createButton("Próximo", data.next));
  }
}

function createTag(type, text) {
  const tag = document.createElement(type);
  const value = document.createTextNode(text);
  tag.append(value);
  return tag;
}

function createButton(name, url) {
  const b = createTag("button", name);
  const arrUrl = url.split("&")[0] + "&limit=20";
  b.setAttribute("class", "btn");
  b.addEventListener(
    "click",
    function () {
      getPokemons(url);
    },
    false
  );
  return b;
}

function populateModalContent(item) {
  const div = document.getElementsByClassName("modal-body")[0];
  div.innerHTML = "";

  const h3 = createTag("h3", item.name.toUpperCase());

  const divImg = createTag("div", "");
  divImg.setAttribute("class", "modal-div-img");

  const frontImg = createTag("img", "");
  frontImg.setAttribute("src", item.sprites.front_default);

  const backImg = createTag("img", "");
  backImg.setAttribute("src", item.sprites.back_default);

  divImg.append(frontImg);
  divImg.append(backImg);
  div.append(h3);
  div.append(divImg);
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}
