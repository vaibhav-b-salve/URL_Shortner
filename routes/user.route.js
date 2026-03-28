const express = require('express');
const handler = require('../controllers/user.controller');

const router = express.Router();

router.post("/register",handler.register);
router.post("/login",handler.login);

module.exports = router;