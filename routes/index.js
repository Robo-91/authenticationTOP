const express = require("express");
const router = express.Router();

// Load in controllers
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

/* GET home page. */
router.get("/", messageController.message_list);

// GET login
router.get("/login", userController.login);

// POST login
router.post("/login", userController.login_post);

// GET signup
router.get("/sign-up", userController.sign_up);

// POST signup
router.post("/sign-up", userController.sign_up_post);

// GET secret message form
router.get("/secret", messageController.secret_message_get);

// POST secret message form
router.post("/secret", messageController.secret_message_post);

// GET dashboard
router.get("/dashboard", userController.dashboard);

// POST message (from dashboard)
router.post("/dashboard", messageController.message_post);

module.exports = router;
