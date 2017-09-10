"use strict"

module.exports =
    {
        objectComparison:
        function objectComparison(fields, flip) {
            if (assertType(fields,String)) 
                fields == [fields]
            var l = fields.length;
            if (flip && flip <0)
                flip = -1;
            else 
                flip = 1;
            return function (objA, objB) {
                if (!fields) return 0; // if no fields to compare, objects are equal
                for (var i = 0; compareAnyTypes(objA[fields[i]], objB[fields[i]]) == 0 && i < l; i++);
                if (i == l) return 0;

                return compareAnyTypes(objA[fields[i]], objB[fields[i]]) * flip;
            }
        }
    }

var compareSimple = (x, y) => x < y ? -1 : (x == y ? 0 : 1)

function compareAnyTypes(objA, objB) {
    if (objA === null || objA === undefined || objA !== objA)
        return (objB === null || objB === undefined || objB !== objB ) ? 0 : -1
    if (objB === null || objB === undefined || objB !== objB)
        return 1

    if ((assertType(objA, Number) || assertType(objA, String)) && (assertType(objB, Number) || assertType(objB, String))) {
        if (typeof objA != typeof objB) { // when trying to compare number to string, check if the comparison is consistent, if not, compare strings
            var a = compareSimple(objA, objB)
            if (a == - compareSimple(objB, objA))
                return a
            objA = '' + objA
            objB = '' + objB
        }
        return compareSimple(objA, objB)
    }

    if (assertType(objA, Date) && assertType(objB, Date)) { // dates are compared through their getTime()
        return compareSimple(objA.getTime(), objB.getTime())
    }
}


function assertType(obj, type) { // generously contributed by Arash Milani on https://arashmilani.com/post?id=35
    return obj.constructor.name === type.name
}