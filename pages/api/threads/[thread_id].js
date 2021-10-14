const db = require("../_dbconnect");

export default function handler(req, res) {
    if (req.method === "GET") {
        const { thread_id } = req.query;

        db.query(
            `SELECT t.thread_id, t.thread_title, t.thread_desc, u.user_name FROM threads t LEFT JOIN users u ON t.user_id=u.user_id WHERE t.thread_id=${thread_id}`,
            (err, thread) => {
                if (err) res.send(err);
                else {
                    db.query(
                        `SELECT c.comm_id, c.comment, u.user_name FROM comments c LEFT JOIN users u ON c.user_id=u.user_id WHERE c.thread_id=${thread_id}`,
                        (err, comments) => {
                            if (err) res.send(err);
                            else {
                                res.status(200).json({
                                    thread: thread[0],
                                    comments,
                                });
                            }
                        }
                    );
                }
            }
        );
    }
}
