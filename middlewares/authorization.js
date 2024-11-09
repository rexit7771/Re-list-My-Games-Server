module.exports = async function Authorization(req, res, next) {
    try {

        next()
    } catch (error) {
        next(error)
    }
}