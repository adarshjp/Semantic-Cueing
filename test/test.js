
const chai = require('chai');
const request = require('supertest');
const app = require('../index');

before(function (done) {
    this.timeout(10000);
    setTimeout(done, 5000);
});
describe('Login Page: GET /login ',() => {
    it('should return 200', () => {
        request(app)
        .get('/login')
        .expect(200)
        .then((res) => {
            expect(res.status).to.be.eql(200);
            // more validations can be added here as required
        });

    });
    it('post correct password and username', () => {
        request(app)
        .post('/login')
        .send({
            username: 'admin',
            password: 'admin'
        })
        .expect(200)
        .then((res) => {
            expect(res.status).to.be.eql(200);
            // more validations can be added here as required
        });
    });
});