const withAuth = (req, res, next) => {
    console.log(req.session);
    if (!req.session.logged_in) {
        res.redirect("/?noAuth=true");
    } else {
        next();
    }
};

module.exports = withAuth;
