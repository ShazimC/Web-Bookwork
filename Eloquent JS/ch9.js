/* 
    todo: Regular Expressions
    * Summary: 
    Regular expressions are objects that represent patterns in strings.
    Method 'test' tests whether a given string matches the pattern
    Method 'exec' returns an array containing all matched groups
    when a match is found. The index property of this array indicates
    where the match started.
    ? What is a group, what is a matched group?

    Strings have a 'match' method to match them against a regexp
    and a 'search' method to search for one, returning only the
    starting position of the match. 'replace' method will replace
    matches of the pattern with string/function.

    Regexps can have options which are written after the closing slash.
    The 'i' option makes the match case insensitive. The 'g' option makes 
    the expression global, which, among other things, causes the replace
    method to replace all instances instead of just the first. The y option
    makes it sticky, which means that it will not search ahead and skip part
    of the string when looking for a match. The u option turns on Unicode mode,
    which fixes a number of problems around the handling of characters that
    take up two code units.

    * Regular expressions are a sharp tool with an awkward handle.
        - They simplify some tasks tremendously but can quickly become
        unmanageable when applied to complex problems.
        - Part of knowing how to use them is resisting the urge to try to
        shoehorn things that they cannot cleanly express into them.
*/

let re1 = new RegExp("abc");
let re2 = /abc/;

console.log(re2.test("123abc456"));
console.log(re1.test("cba"));

// testing whether a string contains any numbers
console.log(/[0123456789]/.test("in 1992")); // --> true
console.log(/[0-9]/.test("in 1992")); // --> true
console.log(/\d/.test("I have a day left")); // --> false
console.log(/\d/.test("I have 1 day left")); // --> true
// * refer to page 147 for list of shortcuts
// testing if string contains characters a,b,c,d,e or f.
console.log(/[a-f]/.test("xyz")); // --> false
console.log(/[a-f]/.test("xyaz")); // --> true

// * '^' is used to invert a set of characters
let zeroOrOne = /[01]/; // finding 0 or 1 in a string
console.log(zeroOrOne.test("maybe?")); // -> false;
console.log(zeroOrOne.test("defin1tely")); // -> true;
let notBinary = /[^01]/; // finding anything except 0 and 1.
console.log(notBinary.test("01")); // -> false, no non-binary chars found
console.log(notBinary.test("o1")); // -> true, o is non-binary

/* 
    * Repeating parts of a pattern
    - + --> element may be present 1 or more times
    - * --> element may be present 0 or more times
    - ? --> element may be present 0 or 1 times
*/

// the ? element is useful for allowing multiple spellings.
let colorSpelling = /colou?r/;
console.log(colorSpelling.test("color")); // --> true
console.log(colorSpelling.test("colour")); // -- true
console.log(colorSpelling.test("colouur")); // -- false

// to indicate that a pattern should occur a precise number of times use {}
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// {z} --> element must occur exactly z times
// {x,y} --> element must occur at least x times and at most y
// {x,} --> element must occur at least x times
console.log(dateTime.test("1-30-2003 8:45")); // --> true
let atMost4Digits = /\d{4}-\d{4}/;
console.log(atMost4Digits.test("123-123")); // --> true
console.log(atMost4Digits.test("123123-123123")); // --> true

/* 
    * Grouping Subexpressions
    - to use an operator like * or + on more than one element at a time,
    you have to use ().
*/

let cartoonCrying = /boo+(hoo+)+/i;
// i at the end is an option specifying case insensitivity.
console.log(cartoonCrying.test("Boohoooohoohooo")); // -> true

/* 
    * Regexp Golf
    - is the prattice of writing the smallest possible reuglar expression 
        for a given pattern and ONLY that pattern.
    - write one out testing whether ONLY the given substrings occur in any
        input string: see list on pg 164.
*/

/* 
    * Quoting Style
    - you want to replace all the single quotes used for distinguishing
        dialogue like: he said, '...' with double quotes.
    - this should not include apostrophes from words like aren't, didn't etc.
    - accomplish this using regular expresssions and the replace method.
*/

/* 
    * Numbers Again
    - Write a regexp that recognizes JS style numbers including:
        - optional minus/plus sign in beginning
        - the decimal dot, but the dot alone is invalid
        - exponent notation: 5e-3 or 1e10
*/
