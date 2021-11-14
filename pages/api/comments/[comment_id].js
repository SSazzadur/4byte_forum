const db = require("../_dbconnect");

export default function handler(req, res) {
    if (req.method === "PUT") {
        const { comment_id } = req.query;
        const { commentText } = req.body;

        db.query(
            `UPDATE comments SET comment='${commentText}' WHERE comm_id = ${comment_id}`,
            (err, results) => {
                if (err) {
                    res.json({
                        message: "Internal server error",
                        status: "error",
                    });
                } else {
                    res.json({
                        message: "Comment updated successfully...",
                        status: "success",
                    });
                }
            }
        );
    } else if (req.method === "DELETE") {
        const { comment_id } = req.query;
        db.query(
            `DELETE FROM comments WHERE comm_id = ${comment_id}`,
            (err, results) => {
                if (err) {
                    res.json({
                        message: "Internal server error",
                        status: "error",
                    });
                } else {
                    res.json({
                        message: "Comment deleted successfully...",
                        status: "success",
                    });
                }
            }
        );
    }
}
