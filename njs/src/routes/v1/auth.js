const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mysql = require('mysql2/promise');

const { dbConfig } = require('../../config');

const userSchema = Joi.object({
  fullname: Joi.string().uppercase().required(),
  email: Joi.string().email().trim().lowercase().required(),
  age: Joi.number().required(),
});

router.post('/register', async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
    console.log(userData);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'Incorrect data sent' });
  }

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `INSERT INTO participants_db.participants (fullname, email, age) values (
        ${mysql.escape(userData.fullname)}, 
        ${mysql.escape(userData.email)}, 
        ${mysql.escape(userData.age)} 
        )`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Unexpected error. Please try again.' });
  }
});
router.get('/listcontrol', async (req, res) => {
  try {
      const con = await mysql.createConnection(dbConfig);
      const [data] = await con.execute(
        `SELECT * FROM participants_db.participants`,
      );
      await con.end();
      return res.send(data);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ err: 'Unexpected error. Please try again.' });
    }
});

module.exports = router;

