const express = require("express");
const bodyParser = require("body-parser");
const sql = require("msnodesqlv8");

const app = express();
const port = 3000;

const connectionString = "server=DESKTOP-5D25OLJ;Database=TestNodeJs;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.use(bodyParser.json());

// GET
app.get("/users", (req, res) => {
    const query = "SELECT * FROM Users";

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Can'not Get Info", details: err });
        }
        res.json(rows); 
    });
});

// POST 
app.post("/users", (req, res) => {
    const { name, email,age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ error: "All Info Require" });
    }

    const query = `INSERT INTO Users (Name, Email, Age) VALUES (?, ?, ?)`;
    const params = [name, email,age];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error", details: err });
        }
        res.json({ message: "OK", user: { name, email ,age} });
    });
});

app.listen(port, () => {
    console.log(`🚀  http://localhost:${port}`);
});
