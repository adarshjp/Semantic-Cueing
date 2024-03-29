const {loginTest}= require('./login')
const {signupTest}= require('./signup')
before(function (done) {
    this.timeout(1000000);
    setTimeout(done, 5000);
});
loginTest()
signupTest()
// describe('GET /login ',() => {
//     it('should render login page and return 200', (done) => {
//         request(app)
//             .get('/login')
//             .expect(200)
//             .end((err, res) => {
//                 if (err) return done(err);
//                 done();
//             });
//     });
// });
// describe('POST /login ',() => {
//     it('correct password and username', (done) => {
//         request(app)
//         .post('/login')
//         .send({
//             username: 'admin',
//             password: 'admin'
//         })
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/json')
//         .expect('Location','/home/admin')
//         .end(function(err, res) {
//             expect(res.status).to.equal(302)
//             // res.header['Location'].should.include('/home')
//             // res.text.to.equal('Login successful')
//             if (err) return done(err);
//             return done();
//         });
        
//     }).timeout(100000)
//     it('incorrect password and username', (done) => {
//         request(app)
//         .post('/login')
//         .send({
//             username: 'admin1',
//             password: 'admin1'
//         })
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/json')
//         .expect('Location','/login')
//         .end(function(err, res) {
//             expect(res.status).to.equal(302)
//             if (err) return done(err);
//             return done();
//         });
        
//     }).timeout(100000)
//     it('no password and username', (done) => {
//         request(app)
//         .post('/login')
//         .send({
//             username: '',
//             password: ''
//         })
//         .set('Accept', 'application/json')
//         .set('Content-Type', 'application/json')
//         .end(function(err, res) {
//             expect(res.status).to.equal(422)
//             if (err) return done(err);
//             return done();
//         });
        
//     }).timeout(100000)
// });