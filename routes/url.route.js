const express = require('express');
const handler = require('../controllers/url.controller');

const router = express.Router();

router.post("/shortner",handler.urlShortner);


module.exports = router;