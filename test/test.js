"use strict"
const assert = require('assert');
var comparer = require('../comparer')


describe('objectComparison', function () {
    it('should work on basic use case - strings', function (done) {
        var comp = comparer.objectComparison(['firstName', 'lastName',]);
        assert.equal(comp({ firstName: 'John', lastName: 'Smith' }, { firstName: 'John', lastName: 'Doe' }), 1)
        done();
    });

    it('should work on basic use case - numbers', function (done) {
        var comp = comparer.objectComparison(['firstName', 'age',]);
        assert.equal(comp({ firstName: 'John', age: 9 }, { firstName: 'John', age: 35 }), -1)
        assert.equal(comp({ firstName: 'John', age: '9' }, { firstName: 'John', age: 35 }), -1)
        assert.equal(comp({ firstName: 'John', age: 9 }, { firstName: 'John', age: '35' }), -1)
        assert.equal(comp({ firstName: 'John', age: 9 }, { firstName: 'John', age: '9' }), 0)
        assert.equal(comp({ firstName: 'John', age: '9' }, { firstName: 'John', age: '35' }), 1) // both strings, compares as strings
        done();
    });

    it('should return flipped results using the flip argument', function (done) {
        var comp = comparer.objectComparison(['firstName', 'age',], -1);
        assert.equal(comp({ firstName: 'John', age: 9 }, { firstName: 'John', age: 35 }), 1)
        assert.equal(comp({ firstName: 'John', age: '9' }, { firstName: 'John', age: 35 }), 1)
        assert.equal(comp({ firstName: 'John', age: 9 }, { firstName: 'John', age: '35' }), 1)
        assert.equal(comp({ firstName: 'John', age: 9 }, { firstName: 'John', age: '9' }), 0)
        assert.equal(comp({ firstName: 'John', age: '9' }, { firstName: 'John', age: '35' }), -1) // both strings, compares as strings
        done();
    });

    it('should work on basic use case - dates', function (done) {
        var comp = comparer.objectComparison(['firstName', 'dateOfBirth',]);
        assert.equal(comp({ firstName: 'John', dateOfBirth: new Date('2006-8-8') }, { firstName: 'John', dateOfBirth: new Date('2006-10-10') }), -1)
        done();
    });
    it('should handle string input', function (done) {
        var comp = comparer.objectComparison('firstName');
        assert.equal(comp({ firstName: 'John', lastName: 'Smith' }, { firstName: 'John', lastName: 'Doe' }), 0)
        done();
    });
    it('should work with array sort', function (done) {
        var comp = comparer.objectComparison(['lastName', 'firstName', 'registrationDate']);
        var data = [
            {
                lastName: 'Johannsen',
                firstName: 'Becky',
                registrationDate: new Date('2017-03-01'),
                instrument: 'piano'
            },
            {
                lastName: "O'Connor",
                firstName: 'Sam',
                registrationDate: new Date('2016-06-01'),
                instrument: 'cello'
            },
            {
                lastName: "Johannsen",
                firstName: 'Paul',
                registrationDate: new Date('2017-03-17'),
                instrument: 'violin'
            },
            {
                lastName: "Johannsen",
                firstName: 'Paul',
                registrationDate: new Date('2017-03-22'),
                instrument: 'triangle'
            },
        ];

        data.sort(comp);

        assert.deepEqual(data,
            [
                {
                    lastName: 'Johannsen',
                    firstName: 'Becky',
                    registrationDate: new Date('2017-03-01'),
                    instrument: 'piano'
                },
                {
                    lastName: "Johannsen",
                    firstName: 'Paul',
                    registrationDate: new Date('2017-03-17'),
                    instrument: 'violin'
                },
                {
                    lastName: "Johannsen",
                    firstName: 'Paul',
                    registrationDate: new Date('2017-03-22'),
                    instrument: 'triangle'
                },
                {
                    lastName: "O'Connor",
                    firstName: 'Sam',
                    registrationDate: new Date('2016-06-01'),
                    instrument: 'cello'
                },
            ]);
        done()
    })
})