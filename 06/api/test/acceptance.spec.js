const { requests } = require('sinon');
const request = require('supertest');

const UserServer = require('../../server');

describe('', () => {
    let server;

    before(async () => {
        const userServer = new UserServer();
        server = await userServer.start();
    });

    after(() => {
        server.close();
    });


    describe('GET /users', () => {

        it('should return string "ok"', async () => {
            await request(server)
                .get('/users/test')
                .expect('ok')
        });

        it('should return 422 error', async () => {
            await request(server)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send({})
                .expect(422)
        });

        it('should create new user and get 201 status', async () => {
            await request(server)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'User1',
                    email: 'example@email.com',
                    password: 'password'
                })
                .expect(201)
        });

    });


});