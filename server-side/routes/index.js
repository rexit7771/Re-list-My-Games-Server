const favGamesController = require("../controller/FavoriteGameController");
const ProfileController = require("../controller/ProfileController");
const UserController = require("../controller/UserController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const errorHandler = require("../middlewares/errorHandler");
const favGames = require("./favGamesRoutes");
const games = require("./gamesRouter");
const profile = require("./profileRouter");

const router = require("express").Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/login-google", UserController.loginGoogle);

router.use(authentication)

router.use("/profile", profile);
router.use("/fav-games", favGames);
router.use("/games", games);

router.use(errorHandler)

module.exports = router;