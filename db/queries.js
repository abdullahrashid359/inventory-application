const pool = require('./pool');

// Game related queries

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games");

    return rows;
}

async function getGameById(id) {
    const gameResult = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
    const genreResult = await pool.query("SELECT name FROM games g JOIN games_genres gg ON g.id = gg.game_id JOIN genres ON gg.genre_id = genres.id WHERE g.id = $1", [id]);
    const developerResult = await pool.query("SELECT name FROM games g JOIN games_developers gd ON g.id = gd.game_id JOIN developers ON gd.developer_id = developers.id WHERE g.id = $1", [id]);

    return {
        ...gameResult.rows[0],
        genres: genreResult.rows,
        developers: developerResult.rows,
    };
}

async function createGame(title, description = "", price, rating, genres, developers) {
    const gameResult = await pool.query("INSERT INTO games (title, description, price, rating) VALUES ($1, $2, $3, $4) RETURNING id", [title, description, price, rating]);

    const gameId = gameResult.rows[0].id;

    if (genres)
        for (const genre of genres) {
            await pool.query("INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)", [gameId, genre]);
        }

    if (developers)
        for (const developer of developers) {
            await pool.query("INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)", [gameId, developer]);
        }
}

async function updateGame(id, title, description = "", price, rating, genres, developers) {
    await pool.query("UPDATE games SET title = $1, description = $2, price = $3, rating = $4 WHERE id = $5", [title, description, price, rating, id]);

    // Remove existing relationships
    await pool.query("DELETE FROM games_genres WHERE game_id = $1", [id]);
    await pool.query("DELETE FROM games_developers WHERE game_id = $1", [id]);

    // Insert new relationships
    if (genres)
        for (const genre of genres) {
            await pool.query("INSERT INTO games_genres (game_id, genre_id) VALUES ($1, $2)", [id, genre]);
        }

    if (developers)
        for (const developer of developers) {
            await pool.query("INSERT INTO games_developers (game_id, developer_id) VALUES ($1, $2)", [id, developer]);
        }
}

async function deleteGame(id) {
    await pool.query("DELETE FROM games WHERE id = $1", [id]);
}

// Genre related queries

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");

    return rows;
}

async function getGenreById(id) {
    const genreResult = await pool.query("SELECT name FROM genres WHERE id = $1", [id]);
    const gameResult = await pool.query("SELECT * FROM games g JOIN games_genres gg ON g.id = gg.game_id WHERE gg.genre_id = $1", [id]);

    return {
        genre: genreResult.rows[0],
        games: gameResult.rows,
    };
}

async function createGenre(name) {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

async function updateGenre(id, name) {
    await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [name, id]);
}

async function deleteGenre(id) {
    await pool.query("DELETE FROM genres WHERE id = $1", [id]);
}

// Developer related queries

async function getAllDevelopers() { 
    const { rows } = await pool.query("SELECT * FROM developers");

    return rows;
}

async function getDeveloperById(id) {
    const developerResult = await pool.query("SELECT name FROM developers WHERE id = $1", [id]);
    const gameResult = await pool.query("SELECT * FROM games g JOIN games_developers gd ON g.id = gd.game_id WHERE gd.developer_id = $1", [id]);

    return {
        developer: developerResult.rows[0],
        games: gameResult.rows,
    };
}

async function createDeveloper(name) {
    await pool.query("INSERT INTO developers (name) VALUES ($1)", [name]);
}

async function updateDeveloper(id, name) {
    await pool.query("UPDATE developers SET name = $1 WHERE id = $2", [name, id]);
}

async function deleteDeveloper(id) {
    await pool.query("DELETE FROM developers WHERE id = $1", [id]);
}