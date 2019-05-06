const Joi = require('@hapi/joi');

const middlewareObj = {};

middlewareObj.chekCampOwnerShip = (req, res, next) => {
    /* if (req.isAuthenticated()) {
        Camp.findById(req.params.id, (err, campFound) => {
            if (err || !campFound) {
               req.flash('logError', 'Sorry, that campground does not exist!');
               res.redirect('/campamentos');
            } else {
                if (campFound.author.id.equals(req.user._id) || req.user.isAdmin) {
                     req.camp = campFound;
                    next();
                } else {
                    req.flash('logError', 'You don\'t have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('logError', 'You need to be logged first');
        res.redirect('/login');
    } */
}

module.exports = middlewareObj;