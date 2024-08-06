const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TVControl = require('./tv-control');

const app = express();
const tvControl = new TVControl();
const PORT = 3003;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/api/tv/discover', async (req, res) => {
    try {
        const devices = await tvControl.discoverDevices();
        res.status(200).json(devices);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
