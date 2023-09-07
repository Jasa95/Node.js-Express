import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 6969;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

app.get("/artists", async (req, res) => {
  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);
  res.json(artists);
});

app.post("/artists", async (req, res) => {
  const newArtist = req.body;
  newArtist.id = new Date().getTime();

  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
  res.json(artists);
});

// Update artists
app.put("/artists/:id", async (req, res) => {
  // Finder id på den valgte artist
  const id = Number(req.params.id);
  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);
  console.log(id);
  // tager id fra før og fortæller hvad der skal updateres med hvad
  let updateArtists = artists.find((artist) => artist.id === id);
  // Det der skal erstatte updateArtists = body
  console.log(updateArtists); // undefined
  const body = req.body;
  updateArtists.name = body.name;
  updateArtists.birthdate = body.birthdate;
  updateArtists.activeSince = body.activeSince;
  updateArtists.genres = body.genres;
  updateArtists.labes = body.labes;
  updateArtists.image = body.image;
  updateArtists.website = body.website;
  updateArtists.shortDescription = body.shortDescription;

  fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
  res.json(artists);
});

// Delete en valgt artist
app.delete("/artists/:id", async (req, res) => {
  // finder id på den valgte artist
  const id = Number(req.params.id);
  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);

  // filtrer alle andre artists som ikke har det valgte id
  let deleteArtists = artists.filter((artist) => artist.id !== id);
  fs.writeFile("./backend/data/artists.json", JSON.stringify(deleteArtists));
  res.json(artists);
});

// == Helpfunction for backend Favorites list == //

async function readFavorites() {
	const data = await fs.readFile("./Data/favorites.json");
	const favoriteID = await JSON.parse(data);
	return favoriteID;
}
// == Enabels the function to add an artist to the list of favorites in the backend == //
app.get("/favorites", async (req, res) => {
	const favoriteID = await readFavorites();
	const artists = await readArtists();
	const favorites = artists.filter((artist) => favoriteID.includes(artist.id));
	res.json(favorites);
});

app.post("/favorites", async (req, res) => {
	const favoID = req.body.id;
	const favs = await readFavorites();

	if (!favs.includes(favoID)) {
		favs.push(favoID);
		writeFavorites(favs);
	}
	const artists = await readArtists();
	const favorites = artists.filter((artist) => favs.includes(artist.id));
	res.json(favorites);
});
app.delete("/favorites/:id", async (req, res) => {
	const favoID = Number(req.params.id);
	const favs = await readFavorites();

	if (favs.includes(favoID)) {
		const newFavs = favs.filter((id) => id !== favoID);
		writeFavorites(newFavs);

		const artists = await readArtists();
		const favorites = artists.filter((artist) => newFavs.includes(artist.id));
		res.json(favorites);
	}
});
async function writeFavorites(listOfFavorites) {
	fs.writeFile("./Data/favorites.json", JSON.stringify(listOfFavorites));
}
