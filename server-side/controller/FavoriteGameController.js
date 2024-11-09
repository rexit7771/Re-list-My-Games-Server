const { FavoriteGame } = require("../models");
const { default: axios } = require("axios");

module.exports = class favGamesController {
    static async myFavGames(req, res, next) {
        try {
            let { id } = req.user;
            let favGames = await FavoriteGame.findAll({ where: { UserId: id } });


            // console.log(favGames[0].id, "Ini favGames");
            const games = []

            for (let i = 0; i < favGames.length; i++) {
                const element = favGames[i];

                let Base_URL = `https://api.rawg.io/api/games/${element.GameId}?key=${process.env.API_KEY_RAWG}`
                let { data } = await axios({
                    url: `${Base_URL}`,
                    method: 'GET',
                });
                data.FavGameId = element.id
                games.push(data)
            }

            res.status(200).json({ data: games });
        } catch (error) {
            next(error)
        }
    }

    static async addFavGame(req, res, next) {
        try {
            let { id } = req.user;
            let favGame = await FavoriteGame.create({
                GameId: req.body.GameId,
                UserId: id
            });
            res.status(201).json({ data: favGame });
        } catch (error) {
            next(error)
        }
    }

    static async deleteFavGame(req, res, next) {
        try {
            let { id } = req.params
            let favGame = await FavoriteGame.destroy({ where: { id } });
            res.status(200).json({ message: `Game with id ${id} has been deleted` });
        } catch (error) {
            next(error)
        }
    }
}