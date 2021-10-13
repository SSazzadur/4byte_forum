const db = require("../_dbconnect");

export default function handler(req, res) {
    if (req.method === "GET") {
        const { cat_id } = req.query;

        db.query(
            `SELECT c.cat_id, c.cat_name, c.cat_desc, u.user_name FROM categories c LEFT JOIN users u ON c.user_id=u.user_id WHERE c.cat_id=${cat_id}`,
            (err, category) => {
                if (err) res.send(err);
                else {
                    db.query(
                        `SELECT t.thread_id, t.thread_title, t.thread_desc, u.user_name FROM threads t LEFT JOIN users u ON t.user_id=u.user_id WHERE t.cat_id=${cat_id}`,
                        (err, threads) => {
                            if (err) res.send(err);
                            else {
                                res.status(200).json({
                                    category: category[0],
                                    threads,
                                });
                            }
                        }
                    );
                }
            }
        );
    }
}
