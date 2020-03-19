const Policy = require('../../src/Policies/Domain/Policies');
const PolicyError = require('../../src/Policies/Domain/PoliciesException/PolicieError');
const policiesRepo = require('../../src/Policies/Infraestructure/PoliceMockyRepo');
/*****************
 * #Policies Model
 * ****************/
describe('Policy model', function(){
    describe('#new Policy ', function(){
        it('should return a object on valid fields with 6 fields', function(done){
            expect.assertions(2);
            const policy = Policy(
                'id',
                1234,
                'das@oi.co',
                '2016-06-01T03:33:32Z',
                true,
                'clientId-xx-xx'
            );
            expect(typeof policy).toBe('object');
            expect(Object.keys(policy)).toHaveLength(6);
            done();
        });
    });
});
describe('Policy model', function(){
    describe('#new Policy ', function(){
        it('should return a PolicyError on empty id', function(done){
            expect.assertions(3);
            try {
                const policy = Policy(
                    '',
                    1234,
                    'das@oi.co',
                    '2016-06-01T03:33:32Z',
                    true,
                    'clientId-xx-xx'
                );
            } catch (e){
                expect(e).toBeInstanceOf(PolicyError);
                expect(e.message).toEqual('Policy Id not provided');
                expect(e.code.toString()).toMatch('400');
            }
            done();
        });
    });
});
describe('Policy model', function(){
    describe('#new Policy ', function(){
        it('should return a PolicyError on empty clientId', function(done){
            expect.assertions(3);
            try {
                const policy = Policy(
                    'policeId',
                    1234,
                    'das@oi.co',
                    '2016-06-01T03:33:32Z',
                    true,
                    ''
                );
            } catch (e){
                expect(e).toBeInstanceOf(PolicyError);
                expect(e.message).toEqual('ClientId not provided');
                expect(e.code.toString()).toMatch('400');
            }
            done();
        });
    });
});
/*****************
 * #Policy Repository
 *
 * #mockyPolicyRepository
 * ****************/
describe('Policy repository', function(){
    describe('#policiesRepo ', function(){
        it('should be an object when called with 2 fields', async function(done){
            expect.assertions(2);
            expect(Object.keys(policiesRepo)).toHaveLength(2);
            expect(typeof policiesRepo).toBe('object');
            done();
        });
    });
});
describe('Policy repository', function(){
    describe('#policiesRepo ', function(){
        it('should have functions "fetchUserPolicies, findPolicyById"', async function(done){
            expect.assertions(4);
            expect(typeof policiesRepo.fetchUserPolicies).toBe('function');
            expect(typeof policiesRepo.findPolicyById).toBe('function');
            expect(policiesRepo.fetchUserPolicies.name).toEqual('findUserPoliced');
            expect(policiesRepo.findPolicyById.name).toEqual('findPolicyById');
            done();
        });
    });
});
