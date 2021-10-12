require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../_dbconnect");

export default async function handler(req, res) {
    if (req.method === "POST") {
        let { email, password } = req.body;

        db.query(
            `SELECT * FROM users WHERE user_email = '${email}'`,
            async (err, result) => {
                if (err) {
                    res.json({
                        message: "Internal server error",
                        status: "error",
                    });
                } else if (result.length === 0) {
                    res.json({
                        status: "warning",
                        message: "Invalid email...",
                    });
                } else {
                    if (await bcrypt.compare(password, result[0].user_pass)) {
                        const token = jwt.sign(
                            {
                                id: result[0].user_id,
                                email: result[0].email,
                                name: result[0].user_name,
                            },
                            process.env.ACCESS_TOKEN_SECRET
                        );

                        res.json({
                            status: "success",
                            message: "Login successful...",
                            token,
                        });
                    } else {
                        res.json({
                            status: "warning",
                            message: "Invalid password...",
                        });
                    }
                }
            }
        );
    }
}
