Flat object compare
===================

Creates a comparison function for objects than can be sent as an argument to [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

# Installation
```
$ npm install --save flat-object-compare
```

## Example (basic)
```js
var comparer = require('flat-object-compare');
var comp = comparer.objectComparison(['firstName','lastName',]);

comp({firstName: 'John', lastName: 'Smith'}, {firstName: 'John', lastName: 'Doe'}) // ==> 1
// 'John' ==  'John' so the comparison cascades to the lastName fields where 'Smith' > 'Doe'
```

The comparison function in created by calling the `objectComparison` function with a string array containing the desired field names:
```js
var comparer = require('flat-object-compare');
var comp = comparer.objectComparison(['firstName','lastName',]);
```

If the objects are stored in an array a, then a.sort(comp) would produce an array sorted in the correct order, similar to ORDER BY in SQL or the sort functionality in Excel.

To flip the sort order, pass a -1 (or any negative number as a second argument)
```js
var comp = comparer.objectComparison(['firstName','lastName',], -1); // flips sort order
```

## Example (with sort())

```js
var comparer = require('flat-object-compare');
var comp = comparer.objectComparison(['lastName','firstName','registrationDate']);
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
}];

data.sort(comp);
/*
data is now 
 [
     {
        lastName: 'Johannsen',
        firstName: 'Becky',
        registrationDate: '2017-03-01',
        instrument: 'piano'
    },
    {
        lastName: "Johannsen",
        firstName: 'Paul',
        registrationDate: '2017-03-17',
        instrument: 'violin'        
    },
    {
        lastName: "Johannsen",
        firstName: 'Paul',
        registrationDate: '2017-03-22',
        instrument: 'triangle'        
    },  
    {
        lastName: "O'Connor",
        firstName: 'Sam',
        registrationDate: new Date('2016-06-01'),
        instrument: 'cello'        
    },
    ];
*/

```