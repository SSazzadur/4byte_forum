const db = require("./_dbconnect");

export default function handler(req, res) {
    if (req.method === "POST") {
        const { comment, thread_id, user_id } = req.body;

        const sql = `INSERT INTO comments SET ?`;
        const category = {
            comment,
            thread_id,
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
                    message: "Comment posted successfully...",
                });
            }
        });
    }
}
