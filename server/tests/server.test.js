const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

describe('POST /todos', ()=> {


    const todos = [
        {
            text: 'first test todo'
        }, 
        {
            text: 'Second test todo'
        }
    ]

    beforeEach((done)=>{

        Todo.remove({}).then(()=>{
            Todo.insertMany(todos);
        }).then(()=>done());

    })


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

            }).catch((err)=>done(err))

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
            .end(done())

        })

    })

})