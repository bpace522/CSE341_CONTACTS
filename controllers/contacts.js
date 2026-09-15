const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('contacts').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        }); 
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const getOneById = async (req, res) => {
    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Contact ID' });
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('contacts').find({ _id: userId});
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const result = await mongodb.getDb().collection('contacts').insertOne(user);
        if (result.acknowledged) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result.error || 'Error ocurrred creating the user');
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const result = await mongodb.getDb().collection('contacts').replaceOne({ _id: userId}, user);
        if (result.modifiedCount > 0) {
            res.status(200).send();
        }   else {
            res.status(500).json(result.error || 'Error occurred updating the user');
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId});
        if (result.deletedCount > 0) {
            res.status(200).send();
        }   else {
            res.status(500).json(result.error || 'Error occurred deleting the user');
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}


module.exports = { getAll, getOneById, createUser, updateUser, deleteUser};