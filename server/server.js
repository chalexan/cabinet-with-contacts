const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
var md5 = require('md5');

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    console.log(req.body);
    const { login, password } = req.body;
    //password = 12345
    login == "User" && md5(password) == "827ccb0eea8a706c4c34a16891f84e7b" ?
        res.json({ login: "success" }) : res.json({ login: "failed" })
    res.end;
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})