var express = require('express'),
    router = express.Router(),
    PostController = require('../controllers/PostController');

//create
router.post('/',PostController.create);

//read
router.get('/',PostController.getAll);
router.get('/:id',PostController.get);

//update
router.put('/:id',PostController.update);

//delete
router.delete('/:id',PostController.delete);

module.exports = router;