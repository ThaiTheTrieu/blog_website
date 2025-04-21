require('dotenv').config();
const { env } = require('process');
const users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

class UserController {

    showLoginPage(req, res, next) {
        res.render('login', { layout: 'blog' });
    }

    showRegitePage(req, res, next) {
        res.render('user/regiter');
    }

    userNameIsExist(req, res, next) {
        const { userName } = req.body;
        users.findOne({ userName }).then(userName => {
            if (userName)
                res.status(409).json({ exist: true, message: "userName is exist!" });
            else
                res.status(200).json({ exist: false, message: "userName is valid!" });
        }).catch(next);
    }

    // register function
    register(req, res, next) {
        const data = req.body;

        // assure information not empty
        if (!data.fullName || !data.userName || !data.password)
            return res.status(400).send("information is empty!");

        Promise.all([users.findOne({ userName: data.userName }), bcryptjs.hash(data.password, 10)])
            .then(([usernameExist, hashPassword]) => {
                if (usernameExist)
                    res.status(409).json({ message: "User Name already exist!" });
                else {
                    users.create({
                        fullName: data.fullName,
                        userName: data.userName,
                        hashPassword: hashPassword,
                    })
                    res.status(200).json({ message: "Registe success!" });
                }
            }).catch(next);
    }

    async login(req, res, next) {
        try {
            const { userName, password } = req.body;
            const user = await users.findOne({ userName });

            if (!user)
                return res.status(400).json({ message: "Invalid userName or password" });

            const isPasswordValid = user.comparePassword(password);
            if (!isPasswordValid)
                return res.status(400).json({ message: "Invalid userName or password" });

            else if (isPasswordValid) {
                const token = jwt.sign({ userName: userName }, env.PRIVATEKEY || "IDon'tHaveSecrest", { expiresIn: "30m" });
                res.cookie("access_token", token, {
                    //  Chặn truy cập cookie từ JavaScript (giúp tránh XSS - Cross-Site Scripting).
                    httpOnly: true,
                    secure: true,
                    // ngăn chặn tấn công CSRF (Cross-Site Request Forgery).
                    // Lax Chặn cookie trong hầu hết các request cross-site, nhưng vẫn cho phép khi user click vào link đến trang đích.
                    sameSite: "Strict",
                    // xác định thời gian sống của cookie (tính bằng giây)
                    maxAge: 3600000,
                })
                return res.status(200).json({
                    message: "Login successful!",
                    token: token,
                    userName: userName,
                })
            }
        } catch (error) {
            res.status(500).json({ message: `error ${error}` });
        };
    }

    async logout(req, res, next) {
        try {

            res.clearCookie("access_token",
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict",
                });
            return res.status(200).json({message: "Logout successed!"});

        } catch (error) {
            console.log($`logout error: ${error}`);
        }
    }
}

module.exports = new UserController();
