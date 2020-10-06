const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const logger = require('morgan');

const app = express();

app.use(express.json());
app.use(logger('dev'));

let db;
let collection;

async function dbConnection() {
    
    const clint = await MongoClient.connect('mongodb+srv://test_user:qwerty12345@cluster0.z8szf.mongodb.net/test_db?retryWrites=true&w=majority', { useUnifiedTopology: true });

    db = clint.db('test_db');

    collection = db.collection('users');

    console.log('DB Connected succesfully!');
}

dbConnection().catch(err => console.log(err));

app.get('/test', (req, res, next) => res.send('Express'));

app.post('/users', async (req, res, next) => {

    try {
        const { ops } = await collection.insertOne(req.body);

        return res.send(ops[0]);
    } catch (err) {
        console.log(err);
    }
});

app.get('/users', async (req, res, next) => {

    try {
        const users = await collection.find({}).toArray();

        return res.send(users);
    } catch (err) {
        console.log(err);
    }

})

app.get('/users/:id', checkObjectId, async (req, res, next) => {

    try {
        const { id } = req.params;

        const user = await collection.findOne({_id: ObjectId(id)});

        return res.send(user);
    } catch (err) {
        console.log(err);
    }

});

app.put('/users/:id', checkObjectId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.body;

        const modifiedUser = await collection.updateOne({
            _id: ObjectId(id)
        }, { $set: user });

        return res.send(modifiedUser);
    } catch (err) {
        console.log(err);
    }
});

app.delete('/users/:id', checkObjectId, async (req, res, next) => {
    try {
        const { id } = req.params;

        const { deletedCount } = await collection.deleteOne({ _id: ObjectId(id) });

        if (!deletedCount) {
            return res.send({ message: 'User was not deleted. '});
        }

        return res.send({ message: 'User was deleted!'});
    } catch (err) {
        console.log(err);
    }
});

function checkObjectId(req, res, next) {
    if (!ObjectId.isValid(req.params.id)) {
        return res.send({ message: 'Object id is not valid. '});
    }
    next();
}

app.listen(
    3000,
    () => console.log('Server was started.')
);