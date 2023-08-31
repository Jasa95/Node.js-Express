import Express from "express";
const app = Express();
const port = 6969

app.listen(port, () => {
console.log(`Server started on ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello welcome to my website")
});

