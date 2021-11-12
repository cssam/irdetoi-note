/* eslint-disable no-unused-vars */
const { check, validationResult } = require("express-validator");

const Note = require("../models/note.model");

// eslint-disable-next-line no-unused-vars
exports.getNoteList = async function (req, res, next) {
  try {
    const userid = req.params.userid;
    console.log(`at note.controller getNoteList: userid ${userid}`);
    if (userid == null) {
      const errors = [];
      errors.push("userid required");
      req.session.messages.push({
        text: "Userid needed !",
        type: "danger",
      });
      return res.status(500).send(errors);
    }

    Note.find({ user: userid })
      .then(function (data) {
        console.log(`at note.controller getNoteList: ${JSON.stringify(data)}`);
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occured at retriving Notes.",
        });
      });
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).send(err);
  }
};

// eslint-disable-next-line no-unused-vars
exports.getNote = async function (req, res, next) {
  try {
    const id = req.params.id;
    console.log(`at note.controller getNote: note_id ${id}`);

    Note.findById(id)
      .then(function (data) {
        console.log(`at note.controller getNote: ${JSON.stringify(data)}`);
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occured at retriving the Note of ${id}.`,
        });
      });
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).send(err);
  }
};

exports.createNote = [
  check("user", "user is required")
    .notEmpty()
    .withMessage("Please give your user id"),
  check("title", "title required")
    .notEmpty()
    .withMessage("Please give a Title for the Note"),
  check("description", "description required")
    .notEmpty()
    .withMessage("Please give some descriptions of the Note"),
  async function (req, res, next) {
    try {
      console.log(`at note.controller createNote`);
      console.log("req.body: ", req.body);
      const validationErrors = validationResult(req);
      console.log("validationErrors: ", validationErrors);
      const errors = [];
      if (!validationErrors.isEmpty()) {
        validationErrors.errors.forEach((error) => {
          errors.push(error.msg);
        });
      }
      if (errors.length) {
        return res.status(500).send(errors);
      }
      const body = req.body;
      const note = new Note({
        user: body.user,
        title: body.title,
        description: body.description,
      });
      note
        .save()
        .then(function (data) {
          console.log(`at note.controller createNote: ${JSON.stringify(body)}`);
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || `Some error occured at creating the Note.`,
          });
        });
    } catch (err) {
      console.log("err: ", err);
      return res.status(500).send(err);
    }
  },
];
