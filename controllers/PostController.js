var postModel = require('../models/Post')
    , mongoose = require('mongoose');

const postController = {};

postController.create = function (req, res) {
    let data = {
        name: req.body.name,
        autor: req.body.autor
    };

    if (data.name != '' && data.autor != '' && data.autor && data.name) {
        let nuevoPost = new postModel(data);

        nuevoPost.save(function (err, guardado) {
            if (err) {
                res.status(500);
                res.json({ code: 500, err });
            } else {
                res.json({ ok: true, mensage: 'Se a guardado con exito', guardado });
            }
        });
    } else {
        res.json({mensaje: 'faltan datos' });
    }
};

postController.getAll =function (req, res) {

    postModel.find({}, function (err, posts) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ok: true, posts});
        }
    });
};

postController.get = function (req, res) {

    postModel.findById({ _id: req.params.id }, function (err, post) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json(post);
        }
    });
};

postController.update = function (req, res) {
    let update = {
        name: req.body.name,
        autor: req.body.autor
    }

    if (update.name != '' && update.autor != '' && update.autor && update.name) {
        postModel.findByIdAndUpdate({ _id: req.params.id }, update, function (err, old) {
            if(err){
                res.status(500);
                res.json({ code: 500, err });
            }else{
                res.json({mensaje: 'se ha guardado con exito',old,update});
            }
        });
    }
};

postController.delete = function (req, res) {

    postController.findByIdAndRemove(req.params.id, function(err,borrado){
        if(err){
            res.status(500);
            res.json({code:500, err});
        }else{
            res.json({mensaje: 'se ha borrado con exito',borrado});
        }
    });
};

module.exports = postController ;