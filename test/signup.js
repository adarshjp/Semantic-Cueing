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
    // describe('POST /signup ', () => {
    //     it('correct password and username', (done) => {
    //         request(app)
    //             .post('/signup')
    //             .send({
    //                 username: 'admin',
    //                 password: 'admin',
    //                 displaypic: '',
    //                 email: '',
    //             })
    //             .set('Accept', 'application/json')
    //             .set('Content-Type', 'application/json')
    //             .expect('Location', '/login')
    //             .end(function (err, res) {
    //                 expect(res.status).to.equal(302)
    //                 // res.header['Location'].should.include('/home')
    //                 // res.text.to.equal('Login successful')
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     }).timeout(100000)
    // });
};