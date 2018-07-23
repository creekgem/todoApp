const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

Todo.findByIdAndRemove('5b522160ac2d2c3634f84da0').then((todo)=>{
    console.log(todo);
    
}, e=>{
    console.log('No ID found');
});