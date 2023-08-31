import Express from "express";
const app = Express();
const port = 6969;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello welcome to my website");
});

app.post("/", (req, res) => {
  res.send("A POST requested");
});

app.put("/put", (req, res) => {
  res.send("PUT request on /user");
});

app.delete("/delete", (req, res) => {
  res.send("Delete request on /delete");
});
