// get sum of 1 to 5 using while loop

let sum = 0 ;
let count = 1 ;

while (count <= 5 ) {
    sum = sum + count ;
    count++ ;
}

console.log(sum);



// store 5 to 1 in an array using while loop
let  countdown = new Array() ;
let i = 5 ;
let index = 0 ;

while (i > 0 ) {
    countdown[index] = i ;
    // countdown.push(i) ;
    index++ ;
    i-- ;
}

console.log(countdown) ;




// get user input using do while loop

/*let teacollection = new Array();
let input ;

do {

    input = prompt("Enter your favorite tea (type 'stop' to exit): ") ;
    teacollection.push(input) ;

} while (input !== "stop");

console.log(teacollection) ; */





// Multiply each number in an array by 2 and store in another array

let numbers = new Array();
let mulipiedNumbr = new Array();
numbers = [2,4,6,]

for (i = 0 ; i <numbers.length; i++){
    mulipiedNumbr.push(numbers[i]*2); ;
}

console.log(mulipiedNumbr);




// using for in loop to get the keys and values of an object and store them in an array

let citiespopulation = {

    "London "  : 8900000,
    "New York" : 8400000,
    "Paris"    : 2200000,
    "Berlin"   : 3300000,
}

let citiesPopulation = new Array() ;

console.log(Object.keys(citiespopulation)) ; // to get keys
console.log(Object.values(citiespopulation)) ; // to get values

for (const city in citiespopulation) {
/*  console.log(city) ; // to get keys
    console.log(citiespopulation[city]) ;    // to get values */

    if (city === "Berlin"){
        break
    }
    citiesPopulation.push(city) ;
}
console.log(citiesPopulation) ;





// for each loop
let teaCOllection = new Array();
teaCOllection = ["earl gray" , "green tea" , "chai" , "oolong tea"];

let avaliableTea = new Array();

teaCOllection.forEach((tea) => {
    console.log(tea); 
    
});

                                       // you can also use function instead of arrow function

teaCOllection.forEach(function(tea) {
    if (tea === "chai") {
        return;
    }

    avaliableTea.push(tea) ;
    console.log(avaliableTea) ;

});



