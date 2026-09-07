const CustomNotFoundError = require('../errors/CustomNotFoundError');
const db = require('../db/queries');

async function getGames(req, res) {
    const games = await db.getAllGames();

    res.render('games', { games });
}

async function getGame(req, res) {
    const { id } = req.params;

    const game = await db.getGameById(id);

    if (!game)
        throw new CustomNotFoundError("Game not found");

    res.render('game', { game });
}

async function showCreateGameForm(req, res) {
    const developers = await db.getAllDevelopers();
    const genres = await db.getAllGenres();

    res.render("createGame", { developers, genres });
}

async function createGame(req, res) {
    const { title, description, price, rating, developers, genres } = req.body

    const gameId = await db.createGame(title, description, price, rating, genres, developers);

    res.redirect(`/games/${gameId}`);
}

async function showUpdateGameForm(req, res) {
    const { id } = req.params;

    const game = await db.getGameById(id);

    if (!game)
        throw new CustomNotFoundError("Game not found");

    const developers = await db.getAllDevelopers();
    const genres = await db.getAllGenres();

    res.render('updateGame', { game, developers, genres });
}

async function updateGame(req, res) {
    const { id } = req.params;

    const game = await db.getGameById(id);

    if (!game)
        throw new CustomNotFoundError("Game not found");

    const { title, description, price, rating, developers, genres } = req.body

    await db.updateGame(id, title, description, price, rating, genres, developers);

    res.redirect(`/games/${id}`);
}

async function deleteGame(req, res) {
    await db.deleteGame(Number(req.params.id));

    res.redirect('/');
}

module.exports = {
    getGames, getGame, showCreateGameForm, createGame, showUpdateGameForm, updateGame, deleteGame
}