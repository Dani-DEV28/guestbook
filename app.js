import express from 'express';
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pizza'
});

async function connect() {
    try{
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    }catch (err){
        console.log(`Error connecting to the database ${err}`);
    }
}

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: true }))

const PORT = 3000;

const orders = [];

app.get('/', (req,res) => {
    res.render('home');
});

app.post('/submit-contact', (req, res) => {
    console.log(req.body);
    orders.push(req.body);
    res.sendFile(`${import.meta.dirname}/views/confirmed.html`);
});

app.post('/return-contact', (req, res) => {
    console.log(req.body);
    orders.push(req.body);
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/admin/orders', (req, res) => {
    res.send(orders)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});