import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))

const PORT = 3000;

const orders = [];

app.get('/', (req,res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/submit-order', (req, res) => {
    console.log(req.body);
    orders.push(req.body);
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});