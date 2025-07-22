let teaFlavors = ["green tea" , "black tea" , "herbal tea"] ;

let firstTea = teaFlavors[0] ;

let secondTea = teaFlavors[1] ;


let cities = ["New york" , "tokyo" , "london" , "paris"] ;

let favoriteCity = cities[2] ;


// change element in the array

let teaTypes = ["herbal tea"  , "white tea" , "masala tea"] ;
teaTypes[1] = "jasmin tea" ;


// add element in the array

citiesVisited = ["New york" , "tokyo" , "london" , "paris"] ;

citiesVisited.push("Sydney") ;
console.log(citiesVisited.length) ; // this was 5 
citiesVisited[citiesVisited.length] = "mumbai" ;

// remove last element in the array

teaOrders = ["herbal tea" , "white tea" , "masala tea" , "jasmin tea"] ;
teaOrders.pop() ;


// get a copy of the array

let popularTea = ["herbal tea" , "white tea" , "masala tea" , "jasmin tea"] ;

let softCopy = popularTea.slice() ; // hard copy
let softCopy2 = [...popularTea] ; // hard copy
let softCopy3 = popularTea ;  //  soft copy

popularTea.pop() ;

console.log(popularTea); //output will be ["herbal tea" , "white tea" , "masala tea"]

console.log(softCopy); //output will be ["herbal tea" , "white tea" , "masala tea" , "jasmin tea"]
console.log(softCopy2); //output will be ["herbal tea" , "white tea" , "masala tea" , "jasmin tea"]
console.log(softCopy3); //output will be ["herbal tea" , "white tea" , "masala tea" ]


// addtwo arrays together

let europeanCities = ["france" , "germany" , "italy"] ;
let asianCities = ["japan" , "china" , "india"] ;

let worldCities = europeanCities.concat(asianCities) ;


console.log(worldCities);




// chack element in the array

let cityBucketList = ["New york" , "tokyo" , "london" , "paris"] ;

if (cityBucketList.includes("New york")) {
    console.log("New york is in the bucket list");
}


for (let i = 0 ; i < cityBucketList.length ; i++) {

    

    if(cityBucketList[i] == "New york") {
        console.log("New york found at  " + i+1 ) ;
        break;
    }else {
        console.log(cityBucketList[i]);
    }

}