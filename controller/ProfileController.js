const { Profile } = require("../models");

module.exports = class ProfileController {
    static async getProfile(req, res, next) {
        try {
            let { id } = req.user;
            let user = await Profile.findOne({ where: { UserId: id } });

            if (!user) {
                throw { status: 404, name: "NotFound" }
            }
            res.status(200).json({ data: user });
        } catch (error) {
            next(error)
        }
    }

    static async addProfile(req, res, next) {
        try {
            let { id } = req.user;
            let newUser = await Profile.create({
                UserId: id,
                ...req.body
            });
            res.status(201).json({ message: `Profile with UserId ${id} created`, data: newUser });
        } catch (error) {
            next(error)
        }
    }

    static async editProfile(req, res, next) {
        try {
            let { id } = req.user;
            let editUser = await Profile.update(req.body, { where: { UserId: id } });
            res.status(200).json({ message: `User with id ${id} has been updated` });
        } catch (error) {
            next(error)
        }
    }
}