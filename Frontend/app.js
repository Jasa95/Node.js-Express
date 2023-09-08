"use strict";
import {
  createArtist,
  readData,
  updateArtists,
  deleteArtists,
} from "./http.js";

// load og kører start funktion
window.addEventListener("load", start);

let artists;
let selectedListOfArtists;

// start funktion der loader med window.addeventlistner
async function start() {
  console.log("run niggah ruuun");
  artists = await readData();

  displayListOfArtists(artists);
  makeFilterCheckboxes();

  document
    .querySelector("#form-create")
    .addEventListener("submit", createClicked);
  document
    .querySelector("#form-update")
    .addEventListener("submit", updateArtistClicked);

  document
    .querySelector("#filter-form")
    .addEventListener("change", filterArtistsByGenre);
}

// display funktion der tager og kigger på om der er nogen artists
async function displayListOfArtists(listOfartists) {
  document.querySelector("#artists").innerHTML = "";
  if (listOfartists.length !== 0) {
    for (const artist of listOfartists) displayArtist(artist);
  } else {
    document
      .querySelector("#artists")
      .innerHTML("Sorry, we could not find any artists for you!");
  }
}

// displayArtist hvad hver artist i listen artists skal vises med
async function displayArtist(artist) {
  const artistHTML = /*HTML*/ `
  <article class="grind-item" id="artist_${artist.id}">
  <img src="${artist.image}"/>
      <h2>${artist.name}</h2>
      <p>${artist.birthdate}</p>
      <p>${artist.activeSince}</p>
      <p>${artist.genres}</p>
      <p>${artist.labels}</p> 
      <a>${artist.website}</a>
      <p>${artist.shortDescription}</p>
      <section class="btns">
        <button class="btn-delete">Delete</button>
        <button class="btn-update">Update</button>
        <button class="btn-favorite">Favorite</button>
        <button class="btn-remove-favorite">Remove from favorites</button>
      </section>
    </article>
  `;

  document
    .querySelector("#artists")
    .insertAdjacentHTML("beforeend", artistHTML);

  document
    .querySelector("#artists article:last-child .btn-delete")
    .addEventListener("click", () => deleteArtistClicked(artist.id));

  document
    .querySelector("#artists article:last-child .btn-update")
    .addEventListener("click", () => selectArtist(artist));
}

// Delete knap på artist
async function deleteArtistClicked(id) {
  console.log("hej");
  const res = await deleteArtists(id);
  if (res.ok) {
    updateGrid();
  }
}

// hjælpe funktion til updateartistclicked
function selectArtist(artist) {
  selectedListOfArtists = artist;
  const updateForm = document.querySelector("#form-update");
  updateForm.name.value = artist.name;
  updateForm.birthdate.value = artist.birthdate;
  updateForm.activeSince.value = artist.activeSince;
  updateForm.genres.value = artist.genres;
  updateForm.labels.value = artist.labels;
  updateForm.image.value = artist.image;
  updateForm.website.value = artist.website;
  updateForm.shortDescription.value = artist.shortDescription;
  updateForm.scrollIntoView();
}

// update knap på artists
async function updateArtistClicked(event) {
  console.log("hallo");
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const image = form.image.value;
  const website = form.website.value;
  const shortDescription = form.shortDescription.value;
  const res = await updateArtists(
    selectedListOfArtists.id,
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    image,
    website,
    shortDescription
  );

  if (res.ok) {
    form.reset();
    updateGrid();
  }
}

// create form
async function createClicked(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const image = form.image.value;
  const website = form.website.value;
  const shortDescription = form.shortDescription.value;
  const res = await createArtist(
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    image,
    website,
    shortDescription
  );

  if (res.ok) {
    form.reset();
    updateGrid();
    scroll();
  }
}

// update af liste efter delete/update
async function updateGrid() {
  const artists = await readData();
  displayListOfArtists(artists);
}

async function makeFilterCheckboxes() {
  console.log("Creation of filter checkboxes");
  const genres = await getGenresFromArtists();
  for (let i = 0; i < genres.length; i++) {
    const genresHtml = /* html */ `
      <div id="checkboxes">
        <label for="${genres[i].toLowerCase()}">${genres[i]}</label>
        <input
          type="checkbox"
          name="genre"
          id="${genres[i].toLowerCase()}"
          value="${genres[i]}"
        />
      </div>
    `;

    document
      .querySelector("#filter-form")
      .insertAdjacentHTML("beforeend", genresHtml);
  }

  async function getGenresFromArtists() {
    console.log("Get different genres from artists");
    const artists = await readData();

    let differentGenres = [];
    for (let i = 0; i < artists.length; i++) {
      for (let q = 0; q < artists[i].genres.length; q++) {
        if (!differentGenres.includes(artists[i].genres[q])) {
          differentGenres.push(artists[i].genres[q]);
        }
      }
    }
    return differentGenres;
  }
}
async function filterArtistsByGenre() {
  console.log("hej");
  const artists = await readData();
  const selected = [];
  const inputs = document
    .querySelector("#filter-form")
    .querySelectorAll("input[type='checkbox']");

  for (const input of inputs) {
    if (input.checked) {
      selected.push(input.value);
    }
  }
  if (selected.length === 0) {
    updateGrid();
  } else {
    const filteredArtists = artists.filter((artist) => {
      return selected.some((genre) => artist.genres.includes(genre));
    });
    displayListOfArtists(filteredArtists);
  }
}

// scroll
function scroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
