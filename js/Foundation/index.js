// printing types 

console.log("hello world");

process.stdout.write("hello world");

console.table({City: "Bandaragama"});

console.warn({City : "Barndaragama"});

// Data types

let score = 102 ;
let name = "Ashen" ;
let isLoggedin = false ;

let cars = ["nisan" , "toyota" , "honda"]; 
let user = {firstName : "Ashen" , LastName : "Maneth"}; 

let getScore = score;

// change variables in js

let gameName = "Spiderman";
gameName = "Batman";

console.log(gameName);


//objects 
username  = {
    "first name " : "Ashen" ,
    lastName : "Maneth", 
}

username.lastName = "Pamuditha" ;

console.log(typeof username);
console.log(username);
console.log(username["first name "]);
console.log(username.lastName);



// date time 

let today ;
today = new Date();


console.log(today);
console.log(today.getFullYear());
console.log(today.getMonth());
console.log(today.getDate());
console.log(today.getHours());
console.log(today.getMinutes());
console.log(today.getSeconds());



//arays

let newUser = ["Ashen" , "Maneth" , true];

console.log(newUser);
console.log(newUser[0]);
console.log(newUser[1]);
console.log(newUser[2]);


// Type convertion

console.log("1"+ 1) ;
console.log(Number("1") + 1);
console.log(String(1) + 1);
console.log(Boolean(1) + 1);


let value = true ;

console.log(Number(value));

console.log(String(value));
console.log(Boolean(!null));


