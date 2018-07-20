const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, db)=>{
    if(err) {
        return console.error('Unable to connect to db');
    }
    console.log('Connected to db.');


    const database = db.db('TodoApp');
    
    // database.collection('Todos').deleteMany({text:'Walkiing the dogi'}).then((res)=>{
    //     console.log(result);
    // });

    // database.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
    //     console.log(res);
    // })

    // database.collection('Users').deleteMany({name: 'Wasym'}).then((res)=>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.error(err);
    // })

    database.collection('Users').findOneAndDelete({_id: new ObjectID('5b512d381c6f620f800d98fd')}).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.error(err);
        })

    // db.close();
});