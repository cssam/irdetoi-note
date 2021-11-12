const express = require("express");
const router = express.Router();

router.use(require("./auth.route"));
router.use(require("./note.route"));

module.exports = router;
