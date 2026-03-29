const express = require('express');
const handler = require('../controllers/user.controller');
const val = require('../middlewares/auth.middleware');

const router = express.Router();

router.post("/register",handler.register);
router.post("/login",handler.login);
router.get("/getUser",val.validateAdmin,handler.getUser);
router.get("/logout",handler.logout);
module.exports = router;