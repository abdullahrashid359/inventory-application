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

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error)
        throw error;

    console.log(`Server listening on port ${PORT}`);
});