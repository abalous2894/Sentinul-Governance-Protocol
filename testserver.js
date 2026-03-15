const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ADMIN_API_KEY = "sk-svc-550e8400-e29b-41d4-a716-446655440000";

const cors = require('cors');
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Sentinul V3 Security Lab - Active');
});

app.post('/calculate', (req, res) => {
    const result = eval(req.body.expression); 
    res.json({ result });
});

app.get('/login', (req, res) => {
    res.cookie('sessionID', '123456789'); 
    res.send('Logged in');
});

app.use((err, req, res, next) => {
    res.status(500).send(err.stack);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
