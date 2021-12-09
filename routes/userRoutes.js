const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers);

router.route('/:id')
    .delete(userController.deleteUser)
    .put(userController.updateUser)
    .get(userController.getUser);

module.exports = router;