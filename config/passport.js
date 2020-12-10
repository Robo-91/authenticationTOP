const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				try {
					// Match User
					const user = await User.findOne({ email });

					if (!user) {
						return done(null, false, {
							message: "That email is not registered",
						});
					}

					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, { message: "Password Incorrect" });
						}
					});
				} catch (e) {
					console.log(e);
				}
			}
		)
	);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
