
const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
var currentID = 0

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Live on http://localhost:${PORT}`)
)

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'cool',
        size: 'medium'
    })
});

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({
            message: 'We need a logo!'
        })
    }

    else {
        res.send({
            tshirt: `tshirt with your ${logo} and ID of ${id}`,
        });
    }
    
});

app.get('/logindata', (req, res) => {
    res.status(200).send({
        "title": "My google password",
        "target": "Google",
        "target_url": "https://google.ie",
        "password": "abcdefg",
        "username": "Jonathan"
    })
});

app.get('/brute', (req, res) => {
    res.status(200).sendFile('login_data.json' , { root : __dirname});
});

app.get('/login/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).send({
            message: 'No id in request'
        })
    }
    else {
        res.status(200).send({
            
        })
    }
    
});

app.get('/getAcc/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(401).send({
            message: 'No ID in request'
        })
    }
    else {
        try {
            res.status(200).sendFile(String(id) + ".json" , { root : __dirname});
        } catch (err) {
            res.status(401).send({
                message: 'ID not found'
            })
        }
        
    }
});

app.post('/makeAcc', (req, res) => {
    const { data } = req.body;

    if (!data) {
        res.status(400).send({
            message: 'Bad request'
        })
    }
    else {
        try {
            let makeJson = JSON.stringify(data, null, 2)
            fs.writeFile(String(currentID) + ".json", data)
            ++currentID

            res.status(200).send({
                message: "Ok"
            })
        } catch(err) {
            console.log(err);
            res.status(400).send({
                message: 'Bad request!'
            })
        }
    }
});