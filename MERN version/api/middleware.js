function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Authenticated")
        return next()
    };
    res.status(400).json("Not Authenticated")
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("Not logged in")
        return next();
    }
    res.status(400).json("Already Logged In")
}

module.exports = { isLoggedIn, isLoggedOut }

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Authenticated")
        return next()
    };
    res.status(400).json("Not Authenticated")
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("Not logged in")
        return next();
    }
    res.status(400).json("Already Logged In")
}


module.exports = { isLoggedIn, isLoggedOut }
