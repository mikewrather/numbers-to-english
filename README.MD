# Mike Wrather's Number -> word translator

I tried to accomplish the following with this implementation:

 * Use typescript to be in line with what you're js coders are using
 * Write a class with structure so that the recursive element can be clear and concise
 * Include the edge cases we originally ignored like numbers between 10 and 20 -- things that originally caught me up.
 * While introducing some complexity and overhead with creating a class with separated concerns, it still performs as an O(n) operation
 * To use, simply clone the repository and run ```node index.js```
 * All typescript is already formatted into JS code.



### Using it

The index simply imports the class as a module and then loops through a series of numbers between 10 and some very large number to show how the format comes out.

```shell
Translating the number: 3
three
__________________________________
Translating the number: 8034
eight thousand, hundred and thirty four
__________________________________
Translating the number: 762811
seven hundred and sixty two thousand, eight hundred and eleven
__________________________________
Translating the number: 5257304442
five billion, two hundred and fifty seven million, three hundred and four thousand, four hundred and fourty two
__________________________________
Translating the number: 8665157677607
eight trillion, six hundred and sixty five billion, one hundred and fifty seven million, six hundred and seventy seven thousand, six hundred and seven
__________________________________
Translating the number: 1550296766217799
one quadrillion, five hundred and fifty trillion, two hundred and ninety six billion, seven hundred and sixty six million, two hundred and seventeen thousand, seven hundred and ninety nine
__________________________________
```

### Thanks for your time and for looking at my first go with TypeScript.  Looks like I cool language I'll enjoy using in the future.
