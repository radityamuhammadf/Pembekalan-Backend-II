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
    const addTask = await m$task.update(req.body)
    helper.sendResponse(res, addTask);
});
//delete
router.delete('/', async function (req, res, next) {
    const addTask = await m$task.remove(req.body.id)
    helper.sendResponse(res, addTask);
});
//read
router.get('/', async function (req, res, next) {
    const addTask = await m$task.get()
    helper.sendResponse(res, addTask);
});

module.exports = router;
