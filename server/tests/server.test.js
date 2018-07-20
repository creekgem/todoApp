const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


    const todos = [
        {
            _id: new ObjectID(),
            text: 'first test todo',
            completed: true,
            completedAt: 33552
        }, 
        {
            _id: new ObjectID(),
            text: 'Second test todo'
        }
    ];

    beforeEach((done)=>{

        Todo.remove({}).then(()=>{
            Todo.insertMany(todos);
        }).then(()=>done());

    });

describe('POST /todos', ()=> {

    it('should create a new todo',(done)=>{

        let text = 'Testing todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }        

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch(err => done(err))
        })

    });

    it('should not create a new todo with empty text',(done)=>{

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err);
            }

            Todo.find().then((todos)=>{
                
                expect(todos.length).toBe(2);
                done();

            }).catch((err)=>done(err));

        });

    });

});

describe('GET /todos', ()=>{

    it('should get all todos', (done)=>{

        request(app)
        .get('/todos')
        .expect(200)
        .expect(res=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done)

    });

});

describe('GET /todos/:id', ()=>{

    it('should return todo doc', (done)=> {            

        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);

    });

    it('should return 404 if todo not found', (done)=>{

        let newId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${newId}`)
        .expect(404)
        .end(done)
        
    });

    it('should return 404 if non-object is passed', (done)=>{

        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
        
    });

});

describe('DELETE /todos/:id', ()=>{

    it('should delete todo', (done)=>{

        const theId = todos[0]._id.toHexString();

        request(app)
        .delete(`/todos/${theId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end((err,res)=>{

            if(err) {
                return done(err);
            }
            
            Todo.findById(theId).then((result)=>{

                expect(result).toNotExist();
                done();

            }).catch(err=>{
                return done(err)
            });

        });

    });
    it('should return 404 if todo not found', (done)=>{

        let newId = new ObjectID();

        request(app)
        .delete(`/todos/${newId}`)
        .expect(404)
        .end(done);

    });
    it('should return 404 if non-object is passed', (done)=>{

        request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);

    });

});


describe('PATCH /todos/:id', ()=>{

    it('should update the todo', (done)=>{

        let todoId = todos[1]._id.toHexString();
        let newText = "Testing the test";

        request(app)
        .patch(`/todos/${todoId}`)
        .send({
            text: newText,
            completed: true
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(newText);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done)

    });

    it('should clear completedAt when todo is not completed', (done)=>{

        let todoId = todos[0]._id.toHexString();
        let newText = "Testing the test TWO";

        request(app)
        .patch(`/todos/${todoId}`)
        .send({
            text: newText,
            completed: false
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(newText);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done)
    });

});