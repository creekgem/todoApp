const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    let todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc)=>{
        res.send(doc)
    }, (err)=>{
        res.status(400).send(err);
    })
    
})

app.get('/todos', (req, res)=> {
    Todo.find().then(todos=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res)=>{

    let {id} = req.params;    

    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }

    Todo.findById(id).then((todo)=>{

        if(!todo) {
            return res.status(404).send({});
        } 
        
        res.send({todo});   

    }).catch(e=>{
        res.status(400).send({});
    });


});

app.delete('/todos/:id', (req, res)=>{

    let {id} = req.params;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }

    Todo.findByIdAndRemove(id).then((todo)=>{

        if(!todo){
            return res.status(404).send({});
        }
        res.send({todo});

    }).catch(e=>{
        res.status(400).send({});
    });

});

app.patch('/todos/:id', (req, res)=>{

    let {id} = req.params;
    let body = _.pick(req.body, ['text', ['completed']]);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send({})
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, {new: true}).then((todo)=>{
        if(!todo){
            res.status(404).send({});
        }
        res.send({todo});
    }).catch(e=>{
        res.status(400).send({});
    })
    

})

// POST /users

app.post('/users', (req, res)=>{

    let body = _.pick(req.body, ['email', 'password']);

    let newUser = new User(body);

    
    newUser.save().then(()=>{
        return newUser.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(newUser);
    }).catch(err=>{
        res.status(400).send(err);
    });

});


app.get('/users/me', authenticate, (req, res)=>{
    
    res.send(req.user);

})


app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app}