const { expect } = require('chai');
const chai = require('chai');
const request = require('supertest');
const app = require('../index').app;
exports.loginTest=()=>{
    describe('GET /login ',() => {
        it('should render login page and return 200', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        });
    });
    describe('POST /login ',() => {
        it('ADMIN-correct password and username', (done) => {
            request(app)
            .post('/login')
            .send({
                username: process.env.ADMIN_USERNAME,
                password: process.env.ADMIN_PASSWORD
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Location','/home/admin')
            .end(function(err, res) {
                expect(res.status).to.equal(302)
                // res.header['Location'].should.include('/home')
                // res.text.to.equal('Login successful')
                if (err) return done(err);
                return done();
            });
            
        }).timeout(100000)
        it('incorrect password and username', (done) => {
            request(app)
            .post('/login')
            .send({
                username: 'admin1',
                password: 'admin1'
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Location','/login')
            .end(function(err, res) {
                expect(res.status).to.equal(302)
                if (err) return done(err);
                return done();
            });
            
        }).timeout(100000)
        it('no password and username', (done) => {
            request(app)
            .post('/login')
            .send({
                username: '',
                password: ''
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.status).to.equal(422)
                if (err) return done(err);
                return done();
            });
            
        }).timeout(100000)
    });
}