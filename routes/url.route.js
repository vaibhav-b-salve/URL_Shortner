const express = require('express');
const handler = require('../controllers/url.controller');
const val = require('../middlewares/auth.middleware');

const router = express.Router();

router.post("/shortner",handler.urlShortner);

router.post("/shortner/user",val.validateUser,handler.urlShortnerUser);

router.get("/goto/:id",handler.redirect);

router.get("/getUrls",val.validateUser,handler.getURL);

module.exports = router;