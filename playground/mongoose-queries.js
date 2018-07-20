const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b5142a95b5eee2aa43ca20c';

User.findById(id).then((user)=>{

    if(!user){
        return console.log('\n\nNo user found with that ID\n\n');
    }
    console.log('\n\n', user, '\n\n');

}).catch(e=>{console.log(e)})


// var id = '5b5153f2e41dd2275cdbf5e8';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('\n\nTodo', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('\n\nTodo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo) {
//         return console.log('\n\nID not found');
//     }
//     console.log('\n\nTodo by ID', todo);
// }).catch(e=>{
//     console.log(e);
// })