const db = require("../_dbconnect");

export default function handler(req, res) {
    if (req.method === "GET") {
        const sql =
            "SELECT c.cat_id, c.cat_name, c.cat_desc, u.user_name FROM categories c LEFT JOIN users u ON c.user_id=u.user_id";
        db.query(sql, (err, result) => {
            if (err) {
                res.json({
                    status: "error",
                    message: "Internal server error",
                });
            } else {
                res.status(200).send(result);
            }
        });
    } else if (req.method === "POST") {
        const { catName, catDesc, userId } = req.body;

        const sql = `INSERT INTO categories SET ?`;
        const category = {
            cat_name: catName,
            cat_desc: catDesc,
            user_id: userId,
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
                    message: "Category added successfully...",
                });
            }
        });
    }
}
