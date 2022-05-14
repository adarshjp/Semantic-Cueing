
const { expect } = require('chai');
const chai = require('chai');
const request = require('supertest');
const app = require('../index').app;

before(function (done) {
    this.timeout(1000000);
    setTimeout(done, 5000);
});
describe('Login Page: GET /login ',() => {
    it('should return 200', (done) => {
        request(app)
            .get('/login')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
    it('post correct password and username', (done) => {
        request(app)
        .post('/login')
        .send({
            username: 'admin',
            password: 'admin'
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
            expect(res.status).to.equal(302)
            if (err) return done(err);
            return done();
        });
        
    }).timeout(100000)
});