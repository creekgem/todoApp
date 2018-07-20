// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, db)=>{
    if(err) {
        return console.error('Unable to connect to db');
    }
    console.log('Connected to db.');


    const database = db.db('TodoApp');
    
    database.collection('Todos').insertOne({
        text: "Walk the dog",
        completed: false
    }, (err, result)=>{
        if(err){
            return console.error('Unable to insert', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    // database.collection('Users').insertOne({
    //     name: 'Wasym',
    //     age: 21,
    //     location: 'Jaffer Bagh, Model Coloy'
    // }, (err, result)=>{
    //     if(err){
    //         return console.error('Unable to insert', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));        
    // })



    db.close();
});