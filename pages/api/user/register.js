require("dotenv").config();
const db = require("../_dbconnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default function register(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        db.query(
            `SELECT * FROM users WHERE user_email = '${email}'`,
            async (err, userExists) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: "Internal server error",
                    });
                } else if (userExists.length > 0) {
                    res.json({
                        status: "warning",
                        message: "User already exists...",
                    });
                } else {
                    const hashedPassword = await bcrypt.hash(password, 10);

                    const user = {
                        user_name: name,
                        user_email: email,
                        user_pass: hashedPassword,
                    };

                    const sql = "INSERT INTO users SET ?";
                    db.query(sql, user, (err, result) => {
                        if (err) {
                            res.json({
                                status: "error",
                                message: "Internal server error",
                            });
                        } else {
                            const token = jwt.sign(
                                { id: result.insertId, name, email },
                                process.env.ACCESS_TOKEN_SECRET
                            );
                            res.status(201).json({
                                status: "success",
                                message: "Registration successful...",
                                token,
                            });
                        }
                    });
                }
            }
        );
    }
}
