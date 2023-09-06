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
// start funktion der loader med window.addeventlistner
async function start() {
  console.log("run niggah ruuun");
  artists = await readData();
  console.log(artists);
  displayListOfArtists(artists);

  document
    .querySelector("#form-create")
    .addEventListener("submit", createArtist);
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
     <img src="url" ${artist.image}/>'
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
    .addEventListener(
      "click",
      () => console.log("delete button clicked"),
      deleteArtists(artist.id)
    );
}
