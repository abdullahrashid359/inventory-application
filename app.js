const net = require('node:net');
net.setDefaultAutoSelectFamily(false);

if (process.env.NODE_ENV !== 'production') {
    process.loadEnvFile('.env');
}

const CustomNotFoundError = require('./errors/CustomNotFoundError');
const express = require('express');
const path = require('node:path');

const indexRouter = require('./routes/indexRouter');
const gamesRouter = require('./routes/gamesRouter');
const genresRouter = require('./routes/genresRouter');
const developersRouter = require('./routes/developersRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/games', gamesRouter);
app.use('/genres', genresRouter);
app.use('/developers', developersRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
    const error = new CustomNotFoundError('Page not found');
    next(error);
});


app.use((err, req, res, next) => {
    console.error(err);

    if (err.statusCode === 404) {
        return res.status(404).render('404', {
            message: err.message,
        });
    }

    res.status(500).send('Something went wrong.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error)
        throw error;

    console.log(`Server listening on port ${PORT}`);
});