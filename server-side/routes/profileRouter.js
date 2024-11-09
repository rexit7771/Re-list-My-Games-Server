const ProfileController = require("../controller/ProfileController");
const profile = require("express").Router();

profile.get("/", ProfileController.getProfile);
profile.post('/', ProfileController.addProfile);
profile.put('/', ProfileController.editProfile);

module.exports = profile;