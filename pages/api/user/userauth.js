require("dotenv").config();
const jwt = require("jsonwebtoken");

export default function userauth(req, res) {
    if (req.method === "GET") {
        const authHeader = req.headers["authorization"];

        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) res.json({ status: "error", isAuth: false });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.json({ status: "warning", isAuth: false });

            res.status(200).json({
                status: "success",
                isAuth: true,
                data: user,
            });
        });
    }
}
