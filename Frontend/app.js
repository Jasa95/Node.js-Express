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
  updateGrid();

  document
    .querySelector("#form-create")
    .addEventListener("submit", createClicked);
  document
    .querySelector("#form-update")
    .addEventListener("submit", updateArtists);
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
    <section class="grind-item">
     <img src="${artist.image}"/>'
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
      </section>
    </section>
  `;

  document
    .querySelector("#artists")
    .insertAdjacentHTML("beforeend", artistHTML);

  document
    .querySelector("#artists section:last-child .btn-delete")
    .addEventListener("click", () => deleteArtistClicked(artist.id));

  document
    .querySelector("#artists section:last-child .btn-update")
    .addEventListener("click", () => updateArtistClicked(artist));
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
}

// update knap på artists
async function updateArtistClicked(event) {
  event.preventDefault();
  const form = event.target
  const name = form.name.value;
  const birthdate = form.brithdate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const image = form.image.value;
  const website = form.website.value;
  const shortDescription = form.shortDescription.value;
  const res = await updateArtists(
    selectArtist.id,
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
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
  const form = event.target
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
  }
}

// update af liste efter delete/update
async function updateGrid() {
  const artists = await readData();
  displayArtist(artists);
}
