const endpoint = "http://localhost:6969";

async function createArtist(
  name,
  birthdate,
  activeSince,
  genres,
  labels,
  website,
  image,
  shortDescription
) { console.log("Update artists called with id:", id);
console.log("Name:", name);
  const newArtist = {
    name: name,
    birthdate: birthdate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    image: image,
    shortDescription: shortDescription,
  };

  const artistAsJSON = JSON.stringify(newArtist);
  const res = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistAsJSON,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}

async function readData() {
  const res = await fetch(`${endpoint}/artists`);
  const data = await res.json();
  return data;
}

async function updateArtists(
  id,
  name,
  birthdate,
  activeSince,
  genres,
  labels,
  website,
  image,
  shortDescription
) {
  const artistsToUpdate = {
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistAsJSON = JSON.stringify(artistsToUpdate);
  const res = await fetch(`${endpoint}/artists/${id}`, {
    method: "PUT",
    body: artistAsJSON,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}

async function deleteArtists(id) {
  const res = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  return res;
}

export { createArtist, readData, updateArtists, deleteArtists };
