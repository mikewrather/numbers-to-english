/**
 * Created by mikewrather on 6/20/16.
 *
 *
 **/
import IntegerToWords = require('./src/integer-to-words');

var intToWords = new IntegerToWords();

// var translator = new IntegerToWords();
// setTimeout(function (){},10000);
for (var size = 10; size < 100000000000000000; size *= 1000){
    var digits = numberBetween(size);
    console.log("Translating the number: " + digits);
    console.log(intToWords.translateNumber(digits));
    console.log("__________________________________")
}


function  numberBetween( end:number, start?:number) : number {
    start = start || 1;
    return Math.round(Math.random() * end) + start;
}
