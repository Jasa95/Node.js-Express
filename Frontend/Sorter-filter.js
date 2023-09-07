function sortArtist(listOfArtists, sortBy) {
  if (sortBy === "") {
    return listOfArtists;
  }
  if (sortBy === "name") {
    return listOfArtists.sort((artistA, artistB) =>
      artistA.name.localeCompare(artistB.name)
    );
  }
  if (sortBy === "birthdate") {
    return listOfArtists.sort((artistA, artistB) =>
      artistA.birthdate.localeCompare(artistB.birthdate)
    );
  }
}
// == Filter by Genre == //
function filterArtist(listOfArtists, filterBy) {
  if (filterBy === "") {
    return listOfArtists;
  }
  if (filterBy === "Pop") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Rock") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Hip-hop") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Electropop") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Rap") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Alternative") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Country") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "R&B") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Folk") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
  if (filterBy === "Soul") {
    return listOfArtists.filter((artist) => artist.genres.includes(filterBy));
  }
}

export { sortArtist, filterArtist };
