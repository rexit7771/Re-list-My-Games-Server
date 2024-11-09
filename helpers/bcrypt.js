const bcrypt = require('bcryptjs');

const hashing = (password) => {
    return bcrypt.hashSync(password, 10);
}

const compare = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword);
}

module.exports = {
    hashing,
    compare
}