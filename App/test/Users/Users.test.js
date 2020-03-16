const User = require('../../src/Users/Domain/User');
const UserError = require('../../src/Users/Domain/UserException/UserError');
const filterUserByName = require('../../src/Users/Aplication/filterUsersByName');
const findUserById = require('../../src/Users/Aplication/findUserById');
const findUserPolicies = require('../../src/Users/Aplication/findUserPolicies');
const userRepo = require('../../src/Users/Infraestructure/mockyUsersRepository');
const policiesRepo = require('../../src/Policies/Infraestructure/PoliceMockyRepo');
/*****************
 * #User Model
 * ****************/
describe('User model', function(){
    describe('#new User ', function(){
        it('should return a object on valid fields with 4 fields', function(done){
            const user = User('id', 'testName', 'das@oi.co', 'role');
            expect(typeof user).toBe('object');
            expect(Object.keys(user)).toHaveLength(4);
            done();
        });
    });
});
describe('User model', function(){
    describe('#new User ', function(){
        it('should return UserError with message "ClientError Id not provided" on missing id', function(done){
            expect.assertions(3);
            try {
                const user = User('', 'testName', 'das@oi.co', 'role');
            } catch (e){
                expect(e).toBeInstanceOf(UserError);
                expect(e.message).toMatch('ClientError Id not provided');
                expect(e.code.toString()).toMatch('400');
            }
            done();
        });
    });
});
describe('User model', function(){
    describe('#new User ', function(){
        it('should return UserError with message "ClientError role not provided." on missing role', function(done){
            expect.assertions(3);
            try {
                const user = User('userid', 'testName', 'das@oi.co', '');
            } catch (e){
                expect(e).toBeInstanceOf(UserError);
                expect(e.message).toMatch('ClientError role not provided.');
                expect(e.code.toString()).toMatch('400');
            }
            done();
        });
    });
});
/*****************
 * #User use cases
 *
 * #findUserByName
 * ****************/
describe('Users use cases', function(){
    describe('#findUserByName->invoke ', function(){
        it('should resolve to object on valid name with 4 fields', async function(done){
            expect.assertions(2);
            const users = await filterUserByName(userRepo).invoke('Britney');
            expect(typeof users[0]).toBe('object');
            expect(Object.keys(users[0])).toHaveLength(4);
            done();
        });
    });
});
describe('Users use cases', function(){
    describe('#findUserByName->invoke ', function(){
        test('should reject whit message "Name provided not found" and code "404" when bad name', function(){
            expect.assertions(2);
            return filterUserByName(userRepo).invoke('ss')
                .then(function(xxx){
                })
                .catch(function(e){
                    const message = e.message;
                    const code = e.code.toString();
                    expect(message).toMatch('Name provided not found');
                    expect(code).toMatch('404');
                });
        });
    });
});
/*****************
 * #findUserById
 * ****************/
describe('Users use cases', function(){
    describe('#findUserById->invoke ', function(){
        it('should resolve to object on valid user id with 4 fields', async function(done){
            expect.assertions(2);
            const users = await findUserById(userRepo).invoke('a0ece5db-cd14-4f21-812f-966633e7be86');
            expect(typeof users).toBe('object');
            expect(Object.keys(users)).toHaveLength(4);
            done();
        });
    });
});
describe('Users use cases', function(){
    describe('#findUserById->invoke ', function(){
        test('should reject whit message "Id provided not found" and code "404" when bad user id', function(){
            expect.assertions(2);
            return findUserById(userRepo).invoke('ss')
                .then(function(xxx){
                })
                .catch(function(e){
                    const message = e.message;
                    const code = e.code.toString();
                    expect(message).toMatch('Id provided not found');
                    expect(code).toMatch('404');
                });
        });
    });
});
/*****************
 * #findUserPolicies
 * ****************/
describe('Users use cases', function(){
    describe('#findUserPolicies->invoke ', function(){
        it('should resolve to object policies on valid user id with 6 fields', async function(done){
            expect.assertions(2);
            const policies = await findUserPolicies(policiesRepo).invoke('a0ece5db-cd14-4f21-812f-966633e7be86');
            expect(typeof policies[0]).toBe('object');
            expect(Object.keys(policies[0])).toHaveLength(6);
            done();
        });
    });
});
describe('Users use cases', function(){
    describe('#findUserPolicies->invoke ', function(){
        test('should reject whit message "Not policies found for this client" and code "404" when bad user id', function(){
            expect.assertions(2);
            return findUserPolicies(policiesRepo).invoke('ss')
                .then(function(xxx){
                })
                .catch(function(e){
                    const message = e.message;
                    const code = e.code.toString();
                    expect(message).toMatch('Not policies found for this client');
                    expect(code).toMatch('404');
                });
        });
    });
});
/*****************
 * #Users Repository
 *
 * #mockyUsersRepository
 * ****************/
describe('Users repository', function(){
    describe('#userRepo ', function(){
        it('should be an object when called with 2 fields', async function(done){
            expect.assertions(2);
            expect(Object.keys(userRepo)).toHaveLength(2);
            expect(typeof userRepo).toBe('object');
            done();
        });
    });
});
describe('Users repository', function(){
    describe('#userRepo ', function(){
        it('should have functions "findUserById, filterUserByName"', async function(done){
            expect.assertions(4);
            expect(typeof userRepo.findUserById).toBe('function');
            expect(typeof userRepo.filterUserByName).toBe('function');
            expect(userRepo.findUserById.name).toEqual('findClientById');
            expect(userRepo.filterUserByName.name).toEqual('filterClientByName');
            done();
        });
    });
});