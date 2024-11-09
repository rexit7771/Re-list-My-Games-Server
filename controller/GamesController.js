const { default: axios } = require("axios");
const gemini = require("../helpers/gemini");

module.exports = class GameController {
    static async getAllGames(req, res, next) {
        try {
            let Base_URL = `https://api.rawg.io/api/games?key=${process.env.API_KEY_RAWG}&page=1&page_size=12`

            let { page, page_size, search, developers, publishers, genres, stores, platforms } = req.query;

            if (page) {
                Base_URL += `&page=${page}`
            }
            if (page_size) {
                Base_URL += `&page_size=${page_size}`
            }
            if (search) {
                Base_URL += `&search=${search}`
            }
            if (developers) {
                Base_URL += `&developers=${developers}`
            }
            if (publishers) {
                Base_URL += `&publishers=${publishers}`
            }
            if (genres) {
                Base_URL += `&genres=${genres}`
            }
            if (stores) {
                Base_URL += `&stores=${stores}`
            }
            if (platforms) {
                Base_URL += `&platforms=${platforms}`
            }


            let { data } = await axios({
                url: `${Base_URL}`,
                method: 'GET',
            });

            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getGameById(req, res, next) {
        try {
            let Base_URL = `https://api.rawg.io/api/games/${req.params.id}?key=${process.env.API_KEY_RAWG}`
            let { data } = await axios({
                url: `${Base_URL}`,
                method: 'GET',
            });
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async story(req, res, next) {
        try {
            const { game } = req.body;
            let result = await gemini(game);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}