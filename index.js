//Following tutorial @ https://www.youtube.com/watch?v=-MTSQjw5DrM

const express = require('express');
const app = express();
const PORT = 8080;

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