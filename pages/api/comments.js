const db = require("./_dbconnect");

export default function handler(req, res) {
    if (req.method === "POST") {
        const { commentText, thread_id, user_id } = req.body;

        const sql = `INSERT INTO comments SET ?`;
        const comment = {
            comment: commentText,
            thread_id,
            user_id,
        };

        db.query(sql, comment, (err, result) => {
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
