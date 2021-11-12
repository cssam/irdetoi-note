const { model, Schema } = require("mongoose");
const moment = require("moment");

const NoteSchema = new Schema(
  {
    title: { type: String, required: true, max: 50 },
    description: { type: String, required: true, max: 1000 },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

NoteSchema.virtual("createAt_formatted").get(function () {
  return moment(this.createAt).format("YYYY-MM-DD");
});

const Note = model("Note", NoteSchema);
module.exports = Note;
