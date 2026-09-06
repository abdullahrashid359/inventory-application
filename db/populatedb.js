const net = require('node:net');
net.setDefaultAutoSelectFamily(false);

process.loadEnvFile('.env');
const { Client } = require('pg');

const SQL = `
CREATE TABLE games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    description VARCHAR (250),
    price NUMERIC (10, 2) NOT NULL,
    rating NUMERIC (3, 1) NOT NULL
);

CREATE TABLE genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (100) NOT NULL UNIQUE
);

CREATE TABLE developers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (100) NOT NULL
);

CREATE TABLE games_genres (
    game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, genre_id)
);

CREATE TABLE games_developers (
    game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    developer_id INTEGER NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, developer_id)
);

INSERT INTO genres (name)
VALUES
    ('Action'),
    ('RPG'),
    ('Adventure'),
    ('Sports'),
    ('Strategy'),
    ('Horror');

INSERT INTO developers (name)
VALUES
    ('Rockstar Games'),
    ('CD Projekt Red'),
    ('Naughty Dog'),
    ('FromSoftware'),
    ('Valve'),
    ('Capcom');

INSERT INTO games (title, description, price, rating)
VALUES
    ('Grand Theft Auto V', 'Open-world action-adventure game set in Los Santos.', 29.99, 9.5),
    ('The Witcher 3', 'Open-world fantasy RPG following the adventures of Geralt of Rivia.', 39.99, 9.7),
    ('The Last of Us Part I', 'Story-driven action-adventure game set in a post-apocalyptic world.', 49.99, 9.2),
    ('Elden Ring', 'Open-world action RPG set in the vast world of the Lands Between.', 59.99, 9.6),
    ('Counter-Strike 2', 'Competitive multiplayer first-person shooter.', 0.00, 8.8),
    ('Resident Evil Village', 'Survival horror game set in a mysterious European village.', 39.99, 8.7),
    ('Red Dead Redemption 2', 'Open-world western action-adventure game.', 44.99, 9.8),
    ('Street Fighter 6', 'Competitive fighting game featuring classic and new fighters.', 59.99, 9.0);

INSERT INTO games_genres (game_id, genre_id)
VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 3),
    (3, 1),
    (3, 3),
    (4, 1),
    (4, 2),
    (4, 3),
    (5, 1),
    (5, 5),
    (6, 1),
    (6, 6),
    (7, 1),
    (7, 3),
    (8, 1),
    (8, 4);

INSERT INTO games_developers (game_id, developer_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 1),
    (8, 6);
`;

async function main() {
    console.log('seeding...');

    let client;

    try {
        client = new Client(process.env.DATABASE_URL);

        await client.connect();
        await client.query(SQL);

        console.log('done');
    } catch (err) {
        console.log('error seeding database: ', err);
    } finally {
        await client.end();
    }
}

main();