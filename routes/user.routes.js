const UserRouter = require('express').Router();
const User = require('../models/google.user.model');

UserRouter.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err);
    })
});;

module.exports = UserRouter