//51 video lesson

//function constructor
function Person(name,age){
    this.name = name;
    this.age = age;
}

function Car(make,model){
    this.make = make;
    this.model = model;
}           

let myCar = new Car("toyota","camry");
console.log(myCar);




// function inside function
function Tea(type){
    this.type = type;

    this.describe = function(){
        console.log(this.type);
    }
}

let myTea = new Tea("green tea");
myTea.describe();




// use prototype for function
function Animal(species){
    this.species = species;
}

Animal.prototype.sound = function(){
    return `${this.species} makes a sound`;
}

let dog = new Animal("dog");
console.log(dog.sound());






// fucntion with error message
function Drink(name){
    if(!new.target){
        throw new Error("Please use the new keyword");
    }
    this.name = name;
}

let tea = new Drink("green tea");
console.log(tea);

let coffee = Drink("coffee");
console.log(coffee);