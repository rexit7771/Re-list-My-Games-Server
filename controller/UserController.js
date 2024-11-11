const { hashing, compare } = require("../helpers/bcrypt");
const { signPayload, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require('google-auth-library');

module.exports = class UserController {
    static async login(req, res, next) {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                throw { status: 400, name: "nullEmail/Password" }
            }

            let user = await User.findOne({ where: { email } });
            if (!user) {
                throw { status: 400, name: "InvalidLogin" }
            }
            let validate = compare(password, user.password);
            if (!validate) {
                throw { status: 400, name: "InvalidLogin" }
            }

            let payload = { id: user.id };
            let token = signPayload(payload);
            res.status(200).json({ access_token: token });
        } catch (error) {
            next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const client = new OAuth2Client();
            // we receive googleToken from the client
            const { googleToken } = req.body;
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                // we use our client_id from the Google console
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const { email } = payload;
            const [user, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                    email: payload.email,
                    // We can type any password as a placeholder.
                    // In future development, you should implement a feature to update the user's password.
                    password: 'google_id'
                },
                // Required to set hooks: false
                hooks: false
            });

            const token = signPayload({ id: user.id });

            res.status(created ? 201 : 200).json({ access_token: token });

        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                throw { status: 400, name: "nullEmail/Password" }
            }
            let newUser = await User.create({ email, password });
            res.status(201).json({ message: `User with email ${newUser.email} has been created` });
        } catch (error) {
            next(error)
        }
    }
}
