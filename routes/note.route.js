const express = require("express");
const passport = require("passport");

const router = express.Router();

const note_controller = require("../controllers/note.controller");

router.get(
  "/notes/:userid",
  passport.authenticate("jwt", { session: false }),
  note_controller.getNoteList
);

router.get(
  "/note/:id",
  passport.authenticate("jwt", { session: false }),
  note_controller.getNote
);

router.post(
  "/note",
  passport.authenticate("jwt", { session: false }),
  note_controller.createNote
);

module.exports = router;
