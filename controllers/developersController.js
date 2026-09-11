const CustomNotFoundError = require('../errors/CustomNotFoundError');
const db = require('../db/queries');

async function getDevelopers(req, res) {
    const developers = await db.getAllDevelopers();

    res.render('developers', { developers });
}

async function getDeveloper(req, res) {
    const { id } = req.params;

    const result = await db.getDeveloperById(id);

    if (!result.developer)
        throw new CustomNotFoundError("Developer not found");

    res.render(`developer`, { developer: result.developer, games: result.games });
}

async function showCreateDeveloperForm(req, res) {
    res.render('createDeveloper');
}

async function createDeveloper(req, res) {
    const { name } = req.body;

    await db.createDeveloper(name);

    res.redirect('/developers');
}

async function showUpdateDeveloperForm(req, res) {
    const { id } = req.params;

    const result = await db.getDeveloperById(id);

    if (!result.developer)
        throw new CustomNotFoundError("Developer not found");

    res.render('updateDeveloper', { id, developer: result.developer });
}

async function updateDeveloper(req, res) {
    const { id } = req.params;

    const { name } = req.body;

    await db.updateDeveloper(id, name);

    res.redirect(`/developers/${id}`);
}

async function deleteDeveloper(req, res) {
    const { id } = req.params;

    await db.deleteDeveloper(id);

    res.redirect('/developers');
}

module.exports = { getDevelopers, getDeveloper, showCreateDeveloperForm, createDeveloper, showUpdateDeveloperForm, updateDeveloper, deleteDeveloper }