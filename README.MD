# Mike Wrather's Number -> word translator

I tried to accomplish the following with this implementation:

 * Use typescript to be in line with what your js coders are using
 * Write a class with structure so that the recursive element can be clear and concise
 * Include the edge cases we originally ignored like numbers between 10 and 20 -- things that originally caught me up.
 * While introducing some complexity and overhead with creating a class with separated concerns, it still performs as an O(n) operation
 * To use, simply clone the repository and run ```node index.js```
 * All typescript is already formatted into JS code.


### Using it

The index simply imports the class as a module and then loops through a series of numbers between 10 and some very large number to show how the format comes out.

```shell
Translating the number: 1
one
__________________________________
Translating the number: 7555
seven thousand, five hundred and fifty five
__________________________________
Translating the number: 9023340
nine million, twenty three thousand, three hundred and fourty
__________________________________
Translating the number: 1905168752
one billion, nine hundred and five million, one hundred and sixty eight thousand, seven hundred and fifty two
__________________________________
Translating the number: 710969653447
seven hundred and ten billion, nine hundred and sixty nine million, six hundred and fifty three thousand, four hundred and fourty seven
__________________________________
Translating the number: 8177084489725531
eight quadrillion, one hundred and seventy seven trillion, eighty four billion, four hundred and eighty nine million, seven hundred and twenty five thousand, five hundred and thirty one
__________________________________
```

### Thanks for your time and for looking at my first go with TypeScript.  Looks like A cool language I'll enjoy using in the future.
