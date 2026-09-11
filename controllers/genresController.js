const CustomNotFoundError = require('../errors/CustomNotFoundError');
const db = require('../db/queries');

async function getGenres(req, res) {
    const genres = await db.getAllGenres();

    res.render('genres', { genres });
}

async function getGenre(req, res) {
    const { id } = req.params;

    const result = await db.getGenreById(id);

    if (!result.genre)
        throw new CustomNotFoundError("Genre not found");

    res.render('genre', { genre: result.genre, games: result.games });
}

async function showCreateGenreForm(req, res) {
    res.render('createGenre');
}

async function createGenre(req, res) {
    const { name } = req.body;

    await db.createGenre(name);

    res.redirect('/genres');
}

async function showUpdateGenreForm(req, res) {
    const { id } = req.params;

    const result = await db.getGenreById(id);

    if (!result.genre)
        throw new CustomNotFoundError("Genre not found");

    res.render('updateGenre', { id, genre: result.genre });
}

async function updateGenre(req, res) {
    const { id } = req.params;

    const { name } = req.body;

    await db.updateGenre(id, name);

    res.redirect(`/genres/${id}`);
}

async function deleteGenre(req, res) {
    const { id } = req.params;

    await db.deleteGenre(id);

    res.redirect('/genres');
}

module.exports = { getGenres, getGenre, showCreateGenreForm, createGenre, showUpdateGenreForm, updateGenre, deleteGenre };