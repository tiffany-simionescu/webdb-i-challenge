const express = require('express');
const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
      res.json(await db("accounts").select())
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
      const account = await db("accounts").where("id", req.params.id).select();
      res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    const [id] = await db("accounts").insert(payload);
    res.json(await db("accounts").where("id", id).first());
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    await db("accounts").where("id", req.params.id).update(payload);
    res.json(await db("accounts").where("id", req.params.id).first());
  } catch (err) {
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await db("accounts").where("id", req.params.id).del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
})

module.exports = router;