// Looping Triangle
let str = '';
for(let i = 1; i <= 7; i++){
    str += '#';
    console.log(str);
}

// more elequent solution:
for (let line = "#"; line.length < 8; line += "#")
  console.log(line);

// FizzBuzz
for(let i = 1; i <= 100; i++){
    let fizz = i % 3 === 0 && i % 5 !== 0;
    let buzz = i % 5 === 0 && i % 3 !== 0;
    let fizzbuzz = i % 3 === 0 && i % 5 === 0;
    if(fizz) console.log('Fizz');
    else if(buzz) console.log('Buzz');
    else if(fizzbuzz) console.log('FizzBuzz');
    else console.log(i);
}

// Chessboard
let str = '';
for(let length=1; length <= 8; length++){
    let row = length % 2 === 0 ? '# # # # \n' : ' # # # #\n';
    str += row;
}
console.log(str);

let str = '';
let size = 10;
for(let i = 1; i <= size; i++){
    let row = '';
    for(let k = 1; k <= size; k++){
        if(i % 2 !== 0){
            row += k % 2 !== 0 ? ' ' : '#' 
        }else
            row += k % 2 !== 0 ? '#' : ' ';
    }
    row += '\n';
    str += row;
}
console.log(str);
