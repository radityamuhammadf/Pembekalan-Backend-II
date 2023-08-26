const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$task = require(__module_dir + '/task.module.js');

//create
router.post('/', async function (req, res, next) {
    const addTask = await m$task.add(req.body)
    helper.sendResponse(res, addTask);
});
//update
router.put('/', async function (req, res, next) {
    const updateTask = await m$task.update(req.body)
    helper.sendResponse(res, updateTask);
});
//delete
router.delete('/', async function (req, res, next) {
    const removeTask = await m$task.remove(req.body.id)
    helper.sendResponse(res, removeTask);
});
//read
router.get('/', async function (req, res, next) {
    const readDB = await m$task.read()
    helper.sendResponse(res, readDB);
});

module.exports = router;
