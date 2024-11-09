function errorHandler(error, req, res, next) {
    console.log(error, '<== Error Handler');

    let status = error.status || 500;
    let message = error.message || "Internal Server Error";

    switch (error.name) {
        case "SequelizeValidationError":
            status = 400;
            message = error.errors[0].message;
            break;
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = "Email has been used";
            break;
        case "nullEmail/Password":
            status = 400;
            message = "Email and Password are required";
            break;
        case "InvalidLogin":
            status = 401;
            message = "Invalid Email/Password";
            break;
        case "InvalidToken":
            status = 401;
            message = "Invalid Token";
            break;
        case "unauthorized":
            status = 401;
            message = "Unauthorized";
            break;
        case "NotFound":
            status = 404;
            message = "Data Not Found";
    }

    res.status(status).json({ message });
}

module.exports = errorHandler;