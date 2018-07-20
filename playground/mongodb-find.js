// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, db)=>{
    if(err) {
        return console.error('Unable to connect to db');
    }
    console.log('Connected to db.');


    const database = db.db('TodoApp');
    
    // database.collection('Todos').find({
    //     _id: new ObjectID('5b51279cb1db9f2a5c1b2781')
    // }).toArray().then((docs)=>{

    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, err=>{
    //     console.error('Unable to fetch todos', err);
    // });
    
    database.collection('Todos').find().count().then((data)=>{
        console.log(`Todos count: ${data}`);
        
    }, err=>{
        console.error('Unable to count', err);
    });


    // db.close();
});