const endpoint = "http://localhost:6969";

async function createArtist(
  name,
  birthdate,
  activeSince,
  genres,
  labels,
  image,
  website,
  shortDescription
) {
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
  image,
  website,
  shortDescription
) {
  const artistsToUpdate = {
    id,
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    image,
    website,
    shortDescription,
  };
  console.log(id);
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
// == Add to favorites == //
async function fetchFavorites() {
	const response = await fetch(`${endpoint}/favorites`);
	const data = await response.json();
	return data;
}
async function addToFavorites(id) {
	const newFavorite = {
		id: id,
	};
	const newFavAsJSON = JSON.stringify(newFavorite);
	const response = await fetch(`${endpoint}/favorites`, {
		method: "POST",
		body: newFavAsJSON,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}
async function removeFromFavorites(id) {
	const response = await fetch(`${endpoint}/favorites/${id}`, {
		method: "DELETE",
	});
	return response;
}
export { createArtist, readData, updateArtists, deleteArtists, fetchFavorites, addToFavorites, removeFromFavorites };
