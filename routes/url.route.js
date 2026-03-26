const express = require('express');
const handler = require('../controllers/url.controller');

const router = express.Router();

router.post("/shortner",handler.urlShortner);

router.get("/goto/:id",handler.redirect);

module.exports = router;