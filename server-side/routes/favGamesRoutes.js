const favGames = require("express").Router();
const favGamesController = require("../controller/FavoriteGameController");

favGames.get("/", favGamesController.myFavGames);
favGames.post("/", favGamesController.addFavGame);
favGames.delete("/:id", favGamesController.deleteFavGame);

module.exports = favGames;