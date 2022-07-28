const fi = (function() {
    return {

        myTest: function(){
            console.log("I exist")
        },
  
        myEach: function(collection, message) {
            if (typeof collection !== "object"){
                alert(message(collection+ '\nNote: this function is intended for arrays and objects'));
            }
            let newArray = Object.values(collection); //copies an array, or converts and copies an object to an array
            for (const item of newArray)
                alert(message(item));
            return collection;
            // calls alert with each element passed
            // calls alert properly on object values
            // returns the original collection
        },

        myMap: function(collection, callback) {
            let copiedArray = Object.values(collection);
            let newArray = [];
                for (const item of copiedArray) {
                    newArray.push(callback(item));
                }
            return newArray;
            // successfully returns a correcyly populated array
            // does not modify the original array
            // returns a correctly populated array from modified object values
            // does not modify the original object
        },

        myReduce: function(collection, callback, value) {
            let newArray = Object.values(collection);
            let newValue = 0;
            if (value){
                newValue = value;
            }
                for (const item of newArray) {
                        newValue = callback(newValue, item)
                    }
                if (!value){ //if value is not supplied, element[0] is used as first value
                    newValue = newValue - callback(0, newArray[0]) + newArray[0];
                }
            return newValue;

            // returns the correct reduced value when passed an initial value
            // returns the correct reduced value when not passed an initial value
            // does not modify the original array
            // returns the correct reduced value from object values
            // does not modify the original object
        },

        myFind: function (collection, callback) {
            let newArray = Object.values(collection);
            for (const item of newArray) {
                if (callback(item) === true) return item;
            }
            // returns the value if found
            // does not traverse the whole array if the value is found early
            // returns undefined if the value is not present
        },

        myFilter: function (collection, callback) {
            let copiedArray = Object.values(collection);
            let newArray = [];
            for (const item of copiedArray) {
                if (callback(item) === true) 
                newArray.push(item)
            }
            return newArray;
            // correctly filters for values that the callback evaluates as true
            // correctly returns an empty array if no matching values are found
        },

        mySize: function (collection) {
            let copiedArray = Object.values(collection);
            let length = 0;
            for (const item of copiedArray) {
                length ++;
            }
            return length;
            // correctly returns the size of the collection when an array is passed
            // correctly returns the size of the collection (amount of keys) when an object is passed
        },

        myFirst: function (collection, num) {
            let copiedArray = Object.values(collection);
            let newArray = [];
            let length = num || 1;
            for (let i = 0; i < length; i++) {
                newArray.push(copiedArray[i])
            }
            if (newArray.length === 1)
            return newArray[0];
            return newArray;
            // returns the first element of the collection
            // returns the first n elements of the collection when the second optional argument (n) is provided
        },

        myLast: function (collection, num) {
            let copiedArray = Object.values(collection);
            let newArray = [];
            let i = copiedArray.length-num || copiedArray.length-1;
            for (i; i < copiedArray.length; i++) {
                newArray.push(copiedArray[i])
            }
            if (newArray.length === 1)
            return newArray[0];
            return newArray;
            // returns the last element of the collection
            // returns the last n elements of the collection when the second optional argument (n) is provided
        },

        mySortBy: function (collection, callback) {
            let copiedArray = Object.values(collection);
            function compare(array){
                let changeMade = false;
                for (let i = 0; i < array.length-1; i++){
                        const tempi = array[i];
                        const tempi1 = array[i+1]
                    if (callback(tempi) > callback(tempi1)){
                        array[i] = tempi1;
                        array[i+1] = tempi;
                        changeMade = true;
                    }
                    else {
                        array[i+1] = tempi1;
                    }
                }
            if (changeMade) compare(array);
            else return array;
            }
            compare(copiedArray)
            return copiedArray;
            // --- this one was commented out, not part of the test
            // correctly sorts arrays of integers and arrays of strings
            // does not modify the original arrays
            // correctly sorts arrays of integers with non-standard sort - wtf is that???
                // expect(arraysEqual(mySortBy([1, 2, 3, 4, 5, 6], sortIntsBySin), [5, 4, 6, 3, 1, 2])).to.equal(true)
        },

        myFlatten: function(collection, oneLevel) {
            let newArray = [];
            function iterateAnything(array, once){
                for(const item of array){
                    if(typeof(item) === "object" && once){
                        iterateAnything(item, !oneLevel)
                    }
                    else{
                        newArray.push(item)
                    }
                }
            }
            iterateAnything(collection, true)
            return newArray;
            // --- this one was commented out, not part of the test
            // it('correctly flattens a ludicrously nested array
                // const nestedArr = [1, [2, 3], [[4, 5], 6, [7, [8, 9]]]] should equal [1, 2, 3, 4, 5, 6, 7, 8, 9]
            // correctly flattens a single level when a second argument of "true" is passed', function () {
                // const nestedArr = [1, [2, 3], [[4, 5], 6, [7, [8, 9]]]] should equal [1, 2, 3, [4, 5], 6, [7, [8, 9]]]
        },

        myKeys: function(collection) {
            let newArray = [];
            for (const key in collection) {
                    newArray.push(key);
                }
                return newArray;
            // retrieves all the names of the object's own enumerable properties
            // does not modify the original object
        },

        myValues: function(collection) {
            return Object.values(collection); //finish on a hard one huh.
            // retrieves all the values of the object's own properties
            // does not modify the original object
        },
    };
})();
let test = [1, [2, 3], [[4, 5], 6, [7, [8, 9]]]];
console.log(fi.myFlatten(test, true))