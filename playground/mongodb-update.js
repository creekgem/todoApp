const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, db)=>{
    if(err) {
        return console.error('Unable to connect to db');
    }
    console.log('Connected to db.');


    const database = db.db('TodoApp');
    
    // database.collection('Todos').findOneAndUpdate(
    //     {_id: new ObjectID('5b512b671faae90f80729b02')}, 
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }
    // ).then((result) => {
    //     console.log(result);
    // }).catch((err)=>{
    //     console.error(err);
        
    // })

    database.collection('Users').findOneAndUpdate(
        {
            name: 'Jen'
        },
        {
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }
    ).then(res=>{
        console.log(res);
    })


    // db.close();
});