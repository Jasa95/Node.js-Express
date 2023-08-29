"use strict";
// sætter endpoint til backend/data
const endpoint = "./backend/data";

// load og kører start funktion
window.addEventListener("load", start);

let artists;
// start funktion der loader med window.addeventlistner
async function start() {
  console.log("run niggah ruuun");
  artists = await getData();
  console.log(artists);
  displayListOfArtists(artists);
}

// display funktion der tager og kigger på om der er nogen artists
function displayListOfArtists(listOfartists) {
  document.querySelector("#artists").innerHTML = "";

  if (listOfartists.length !== 0) {
    for (const artist of listOfartists) displayArtist(artist);
  } else {
    document
      .querySelector("#artists")
      .innerHTML("Sorry, we could not find any artists for you!");
  }
}

function displayArtist(artist) {
  document.querySelector("#artists").insertAdjacentHTML(
    "beforeend",
    /* HTML */
    `
      <article class="grind-item">
        <h2>${artist.name}</h2>
        <p>${artist.birthdate}</p>
        <p>${artist.activeSince}</p>
        <p>${artist.genres}</p>
        <p>${artist.labels}</p>
        <a>${artist.website}</a>
        <p>${artist.image}</p>
        <p>${artist.shortDescription}</p>
        <section class="btns">
          <button class="btn-delete">Delete</button>
          <button class="btn-update">Update</button>
        </section>
      </article>
    `
  );
}

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
 const newArtist = {
    name: name,
    birthdate: birthdate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    image: image,
    shortDescription: shortDescription,
 }
 const artistAsJSON = JSON.stringify(newArtist);
 const res = await fetch(`${endpoint}/artists.json`, {
    method: "POST",
    body: artistAsJSON,
 })
return res
  
}

// get data fra backend/data/artists.json
async function getData() {
  const response = await fetch(`${endpoint}/artists.json`);
  const data = await response.json();
  return data;
}
