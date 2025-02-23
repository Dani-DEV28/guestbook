import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const PORT = 3000;

const orders = [];

app.get('/', (req,res) => {
    res.render('home');
});

app.post('/submit-contact', (req, res) => {
    console.log(req.body);
    const { fname, lname, email } = req.body;

    if (!fname || !lname || !email) {
        return res.send('Invalid Input');
    }

    orders.push({ ...req.body, timestamp: new Date().toISOString() });

    res.render('confirmed', { contact: req.body });
});

app.post('/return-contact', (req, res) => {
    console.log(req.body);
    orders.push(req.body);
    // res.sendFile(`${import.meta.dirname}/views/home.ejs`);
    res.render('home', {contact: req.body})
});

app.get('/admin/', (req, res) => {
    res.send(orders)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});