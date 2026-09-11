const { validationResult, matchedData } = require('express-validator');

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('createDeveloper', {
            errors: errors.array(),
            formData: req.body,
        });
    }
    const { name } = matchedData(req);

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

    const result = await db.getDeveloperById(id);

    if (!result.developer)
        throw new CustomNotFoundError("Developer not found");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render('updateDeveloper', {
            developer: result.developer,
            id,
            errors: errors.array(),
        });
    }

    const { name } = matchedData(req);

    await db.updateDeveloper(id, name);

    res.redirect(`/developers/${id}`);
}

async function deleteDeveloper(req, res) {
    const { id } = req.params;

    await db.deleteDeveloper(id);

    res.redirect('/developers');
}

module.exports = { getDevelopers, getDeveloper, showCreateDeveloperForm, createDeveloper, showUpdateDeveloperForm, updateDeveloper, deleteDeveloper }