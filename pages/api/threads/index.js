const db = require("../_dbconnect");

export default function handler(req, res) {
    if (req.method === "POST") {
        const { thread_title, thread_desc, cat_id, user_id } = req.body;

        const sql = `INSERT INTO threads SET ?`;
        const category = {
            thread_title,
            thread_desc,
            cat_id,
            user_id,
        };

        db.query(sql, category, (err, result) => {
            if (err) {
                res.json({
                    status: "error",
                    message: "Internal server error",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Thread started successfully...",
                });
            }
        });
    }
}
