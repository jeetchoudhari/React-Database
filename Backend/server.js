const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'test'
    })

app.get('/', (re, res)=> {
    return res.json("From Backend Side");
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM users";
    db.query(sql, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})


app.post('/users', (req, res) => {
    const { PersonID, LastName, FirstName, Address, City } = req.body;
    const sql = "INSERT INTO users (PersonID, LastName, FirstName, Address, City) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [PersonID, LastName, FirstName, Address, City], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "Data inserted successfully", id: result.insertId });
    });
});


app.listen(8081, ()=>{
    console.log("listening");
})