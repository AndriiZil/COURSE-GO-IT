const should = require('should');
const sinon = require('sinon');
const { expect } = require('chai');

const UserController = require('../users/user.controller');
const FilmModel = require('../films/film.model');
const UserModel = require('../users/user.model');

function sum(a, b) {
    return a + b;
}

function returnObject(name, age) {
    return {
        name, age
    }
}

describe('Test User Service', () => {

    let sandbox, resObj, reqObj;

    describe('User create controller', () => {

    
        after(() => {

        });
    
        before(() => {
            sandbox = sinon.createSandbox();

            resObj = {
                send: () => {}
            };
        
            reqObj = {
                params: {
                    id: '32asd6as45d2a6sdar4gd6'
                },
                user: [{
                    id: 'a64sda3sd16as4d1a3sd1'
                }]
            }
        });
    
        beforeEach(() => {
    
        });
    
        afterEach(() => {
            sandbox.restore();
        });
    
        it('should return the sum of two params', () => {
            const result = sum(5, 2);

            result.should.be.eql(7);
        });

        it('should return an object with params', () => {
            const result = returnObject('Bogdan', 30);

            result.should.be.an.instanceOf(Object).and.have.property('name', 'Bogdan');
            result.should.be.an.instanceOf(Object).and.have.property('age', 30);
        });

        it('should test logic of add film method', async () => {

            const filmId = '32asd6as45d2a6sdar4gd6';

            const stubFindFilmById = sandbox.stub(FilmModel, 'findById').resolves({
                _id: 'f26ew4a6f1e9rt4hr5tg',
                name: 'Titanic'
            });

            const stubFindByIdAndUpdate = sandbox.stub(UserModel, 'findByIdAndUpdate').resolves({
                id: '6rt5gd23fg2e6f2gs3d2s',
                name: 'User',
                email: 'example@mail.com',
                token: 'jwt6ergf5sd3c2a6sd59f2erfs2df.6d5f6s5dfs6d5f6s.5d4f6a5d5a6sd5as56a'
            });

            const stubResSendMethod = sandbox.stub(resObj, 'send').returns({
                status: 200
            });

            const result = await UserController.addFilmToUser(reqObj, resObj, () => {});

            expect(result).to.deep.equal({ status: 200 });

            sinon.assert.calledOnce(stubFindFilmById);
            sinon.assert.calledOnce(stubFindByIdAndUpdate);
            sinon.assert.calledOnce(stubResSendMethod);
            sinon.assert.calledOnceWithExactly(stubFindFilmById, filmId);
        });

        it('should catch error if film does not exists', async () => {

            try {
                const filmId = '32asd6as45d2a6sdar4gd6';

                const stubFindFilmById = sandbox.stub(FilmModel, 'findById').resolves(null);
    
                const stubFindByIdAndUpdate = sandbox.stub(UserModel, 'findByIdAndUpdate').resolves({
                    id: '6rt5gd23fg2e6f2gs3d2s',
                    name: 'User',
                    email: 'example@mail.com',
                    token: 'jwt6ergf5sd3c2a6sd59f2erfs2df.6d5f6s5dfs6d5f6s.5d4f6a5d5a6sd5as56a'
                });
    
                const stubResSendMethod = sandbox.stub(resObj, 'send').returns({
                    status: 200
                });
    
                await UserController.addFilmToUser(reqObj, resObj, () => {});
            } catch(err) {
                sinon.assert.calledOnce(stubFindFilmById);
                sinon.assert.notCalled(stubFindByIdAndUpdate);
                sinon.assert.notCalled(stubResSendMethod);
            }
        });

    });

    describe('User update controller', () => {

        after(() => {

        });
    
        before(() => {
    
        });
    
        beforeEach(() => {
    
        });
    
        afterEach(() => {
    
        });
    
        it('should return the sum of two params', () => {
            const result = sum(5, 2);

            result.should.be.eql(7);
        });

        it('should ....', () => {
    
        });

        it('should ....', () => {
    
        });

    });


});