const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Todo

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: undefined
    }
});


let newTodo = new Todo({
    text: ' Edit this file '
});

newTodo.save().then((doc)=>{
    console.log('Saved doc', doc);
    
}, (err)=>{
    console.error('Unable to save');
    
})

// User

let User = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

let newUser = new User({
    email: 'test@test.com'
});

newUser.save().then(doc=>{
    console.log(JSON.stringify(doc, undefined, 2));
}, err=>{
    console.error(err);
});