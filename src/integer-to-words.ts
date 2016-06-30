/**
 * Created by mikewrather on 6/21/16.
 */
export = IntegerToWords;
class IntegerToWords {

    wordLookup : {[placement : string] : Array<string>} = {};

    constructor(num? : number){
        this.populateWordLookup();
        if (num != undefined) {
            this.translateNumber(num);
        }
        return this;
    }

    /**
     * Constructs our arrays for looking up words.  In oder to handle the teens, I made them part of the singles array.
     * The tensArray and magnitudesArray have blank strings at the beginning for consistency in when calling them with
     * an index.
     * @returns {null}
     */
    populateWordLookup = () => {

        this.wordLookup["singlesArray"] = [
            "","one","two","three","four","five","six","seven","eight","nine",
            "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"
        ];
        this.wordLookup["tensArray"]  = [
            "","","twenty","thirty","fourty","fifty","sixty","seventy","eighty","ninety"
        ];
        this.wordLookup["magnitudesArray"] = [
            "","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septilion"
        ];
        return null;
    };

    /**
     * Takes a number of any length and breaks it up into an array of 3 or less
     * digit sequences.  This is used so that we can process each individually and
     * also know the total order of magnitude which is inferred by the length
     * of the resulting array.
     *
     * @param number - number to be turned into an array of arrays
     * @returns {number[][]} -- an array of arrays in reverse order so each 1-3 digit chunk can be popped out
     */
    groupNumbersInClustersForPlacement = (number) => {
        var arrayOfThrees : number[][] = [];
        let numberAsArray : Array<number> = number.toString(10).split('').map(function(char){ return parseInt(char)});
        for (var idx = numberAsArray.length - 1; idx >= 0 ; idx = idx - 3){

            var thisGroup : number[] = [];
            if (undefined !== numberAsArray[idx - 2]) thisGroup.push(numberAsArray[idx - 2]);
            if (undefined !== numberAsArray[idx - 1]) thisGroup.push(numberAsArray[idx - 1]);
            if (undefined !== numberAsArray[idx]) thisGroup.push(numberAsArray[idx]);

            arrayOfThrees.push(thisGroup);
        }
        return arrayOfThrees;
    };

    /**********************************************************************
     Methods that handle numbers between 1
     /**********************************************************************/

    /**
     * Takes in a number between 0 and 19.  If the number is out of range it will be sent to
     * the parseUnderHundred method.
     * @param digitArray -- an example would be [ 7 ] or [ 1, 2 ] where any two digit array
     *                      needs to start with a 1
     * @returns {string} -- string representation of the numbers in the array
     */
    parseUnder20(digitArray : number[]) : string {
        // first check to make sure that if this is a 2 digit number it is under 20
        if (parseInt(digitArray.join("")) > 19) return this.parseUnderHundred(digitArray);
        return this.wordLookup["singlesArray"][parseInt(digitArray.join(""))];
    };

    /**
     * Looks up a number by tens and then sends the single digits to be parsed by this.parseUnder20()
     * @param digitArray - array with two numerical elements.
     * @returns {string} - string representation of the numbers in english
     */
    parseUnderHundred (digitArray : number[]) : string {
        // catch any instaere this is called when the number is under 20
        if (digitArray[0] == 1) return this.parseUnder20(digitArray);
        return this.wordLookup["tensArray"][digitArray.shift()]  + " " +  this.parseUnder20(digitArray);
    };

    /**
     * Handles the first digit of numbers between 100 and 999 and then falls back to parseUnderHundred()
     * @param digitArray - array with 3 numerical elements
     * @returns {string} - english representation of the numbers passed in
     */
    parseUnderThousand (digitArray : number[]) : string {
        // handles the case where the first digit is 0 because we don't want somethin like
        // ten thousand, hundred and 54... we just want ten thousand, and 54
        var retVal:string = digitArray[0] > 0 ? this.wordLookup["singlesArray"][digitArray.shift()] + " hundred and " :
                                                this.wordLookup["singlesArray"][digitArray.shift()] + " and ";
        retVal += this.parseUnderHundred(digitArray);
        return retVal;
    };

    /**
     * routeNumberSet basically looks at the characteristic of an array and decides what parse method to feed it to.
     * @param currentDigitSet - array of numbers of size 1-3
     * @returns {string} - english representation of that set of numbers
     */
    routeNumberSet(currentDigitSet : Array<number>) : string {

        //if the number is less than the length of our array of single and teen digits
        if (currentDigitSet.length < 3 || (currentDigitSet.length < 3 && currentDigitSet[0] == 1))
            return this.parseUnder20(currentDigitSet);

        // between 20 and 99
        else if (currentDigitSet.length < 3)
            return this.parseUnderHundred(currentDigitSet);

        // between 100 and 999
        else if (currentDigitSet.length === 3)
            return this.parseUnderThousand(currentDigitSet);

    }

    /**
     * recursiveTranslation is the actual recursive methodology used to process these array sets of 1-3 digits.
     * We use the number of sets to determine the order of magnitude -- which is decreased with each iterative call.
     * @param numberGroups number[][] - a 2 dimensional array where the inner array holds 1-3 numerical values
     * @returns {string} - returns the full string value of the entire number combined and formatted.
     */
    recursiveTranslation (numberGroups : Array<Array<number>>) : string {
        // indicates we have handled all number Groups
        if (numberGroups.length == 0) { return ""; }

        // gets the current set of digits we're interested in and removes
        // them from the end of the numberGroups array
        let currentDigitSet : Array<number> = numberGroups.pop();

        // get the english for the current number set and then call recursively
        // to get the following number sets with the appropriate magnitude descriptor
        return this.routeNumberSet(currentDigitSet) + " " +
            this.wordLookup["magnitudesArray"][numberGroups.length] + ", " +
            this.recursiveTranslation(numberGroups);
    };

    /**
     * This function can be called with any number and will
     * return an english-formatted number to the user
     * @param number - the number to be formatted
     * @returns {string} - the english-formatted representation of the number
     */
    public translateNumber (number : number) : string {
        // handle the error case where a non-numerical value is passed in
        if (typeof number !== "number")  return "Unfortunately you did not enter a valid number";

        // make sure we are dealing with an integer here
        number = Math.round(number);
        let numberGroups = this.groupNumbersInClustersForPlacement(number);
        var retVal = this.recursiveTranslation(numberGroups);
        return retVal.trim().replace(" ,","").replace("  "," ");

    }

}

