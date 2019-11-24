const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Genre, validate } = require("../models/genre");
async function createGenre(name) {
  const genre = new Genre({ name });
  return await genre.save();
}

async function gerGenres() {
  return await Genre.find().sort("name");
}

async function updateGenre(id, newName) {
  return await Genre.findByIdAndUpdate(
    id,
    { $set: { name: newName } },
    { new: true }
  );
}

async function searchCourse(genreId) {
  try {
    return await Genre.find({ _id: genreId });
  } catch (error) {
    return;
  }
}

// ------------ API END POINTS ------------------

// GET api/genres
router.get("/", async (req, res) => {
  const genres = await gerGenres();
  res.send(genres);
  res.end();
});

// GET api/genres/1 (get one genre)
router.get("/:id", async (req, res) => {
  const genre = await searchCourse(req.params.id);
  if (!genre) return res.status(404).send("No genre for that id");
  res.send(genre);
  res.end();
});

// POST api/genres
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  try {
    const genre = await createGenre(req.body.name);
    res.status(200).send(genre);
    res.end();
  } catch (ex) {
    console.log("ERROR: POST api/genres", ex.error.message);
  }
});

// PUT api/genres/1
router.put("/:id", async (req, res) => {
  // lookup the genre if not 404 error
  const genre = await searchCourse(req.params.id);
  console.log("EGN", genre);
  if (!genre)
    return res
      .status(404)
      .send("No genre found for that id")
      .end();

  // validate - if so 400 bad req
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // sccess - send updated genres
  const result = await updateGenre(req.params.id, req.body.name);
  res.send(result);
  res.end();
});

// DELETE api/genres/1
router.delete("/:id", async (req, res) => {
  // lookup if not 404
  const genre = searchCourse(req.params.id);
  if (_.isEmpty(genre))
    return res.status(404).send("No genres found for that id");

  // delete if exist
  const result = await Genre.findByIdAndRemove(req.param.id);
  // return delted genre
  res.send(result);
  res.end();
});

module.exports = router;
// GET api/genres
// POST api/genres
// GET api/genres/1
// PUT api/genres/1
// DELETE api/genres/1
