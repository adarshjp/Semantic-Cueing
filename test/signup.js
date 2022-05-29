const request = require('supertest');
const app = require('../index').app;
const { expect } = require('chai');
exports.signupTest = () => {
    describe('GET /register ', () => {
        it('should redirect to /login and return 302', (done) => {
            request(app)
                .get('/register')
                .expect(302)
                .expect('Location', '/login')
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
        it('should render register page and return 200', (done) => {
            /* 
                /register is a protected route, so we need to login first 
                before we can access it.
                and only admin can access it
            */
            let user=request.agent(app);
            user
                .post('/login')
                .send({
                    username: process.env.ADMIN_USERNAME,
                    password: process.env.ADMIN_PASSWORD
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect('Location', '/home/admin')
                .end(function (err, res) {
                    if (err) return done(err);
                    user
                        .get('/register')
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            done();
                        });
                });
        }).timeout(100000);
        it('should render register page and return 200', (done) => {
            /* 
                /register is a protected route, so we need to login first 
                before we can access it.
                and only admin can access it
            */
            let user=request.agent(app);
            user
                .post('/login')
                .send({
                    username: 'admin',
                    password: 'admin'
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect('Location', '/home/admin')
                .end(function (err, res) {
                    if (err) return done(err);
                    user
                        .get('/register')
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            done();
                        });
                });
        }).timeout(100000);
    });
    describe('POST /register ', () => {
        it('should redirect to /login and return 302', (done) => {
            request(app)
                .post('/register')
                .send({
                    username: 'admin',
                    password: 'admin',
                    email:'adarsh.24padmashali@gmail.com',
                    role:'admin',
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect('Location', '/login')
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        }).timeout(100000);
        it('Validation Error 422', (done) => {
            let user=request.agent(app);
            user
                .post('/login')
                .send({
                    username: process.env.ADMIN_USERNAME,
                    password: process.env.ADMIN_PASSWORD
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect('Location', '/home/admin')
                .end(function (err, res) {
                    if (err) return done(err);
                    user
                        .post('/register')
                        .send({
                            username: 'admin',
                            password: 'admin',
                            role:'admin',
                            email:'adarsh@gmail.com',
                            name: 'admin',
                            age:24,
                            displaypic: '',

                        })
                        .set('Content-Type', 'application/json')
                        .expect(422)
                        .end((err, res) => {
                            if (err) return done(err);
                            done();
                        });
                
                    });
                    //done();
                //});
        }).timeout(100000);
    });

};