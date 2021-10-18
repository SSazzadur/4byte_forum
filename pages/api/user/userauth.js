require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../_dbconnect");

export default function userauth(req, res) {
    if (req.method === "GET") {
        const authHeader = req.headers["authorization"];

        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) res.json({ isAuth: false });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) res.json({ status: "error", isAuth: false });

            const sql = `SELECT * FROM users WHERE user_email='${user.email}'`;

            db.query(sql, (error, result) => {
                if (error) res.json({ isAuth: false });
                else if (result.length > 0)
                    res.status(200).json({
                        isAuth: true,
                        data: user,
                    });
                else res.json({ isAuth: false });
            });
        });
    }
}
