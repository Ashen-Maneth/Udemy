class Vehicle {

    constructor(make , model){
        this.make = make;
        this.model = model;
    }


    start() {
        return `${this.model} is a car from ${this.make}`;
    }


}


class Car extends Vehicle{

    drive(){
        return `${this.make} : this is an inheritence example`
    }

}




let mycar = new Car("toyota" , "camry");
console.log(mycar.start());
console.log(mycar.drive());

let Vehicle1 = new Vehicle("honda" , "civic");
console.log(Vehicle1.start());






// Encapsulation



class BankAccount {

    #balance = 0 ;


    deposit(amount){
        this.#balance += amount ;
        return this.#balance ;
    }


    getBalance(){
        return `$ ${this.#balance}` ;
    }
}


/* let account1 = new BankAccount();
console.log(account1.#balance) */     // lie this we cant access the private property directly

let account = new BankAccount();
console.log(account.deposit(100));
console.log(account.getBalance());







// Abstraction

class CoffeMachine {

    start(){
        // call DB
        // filter value

        return "Starting the coffe machine";
    }


    brewCoffee() {
        // complex calculation
        return "Brewing coffe";
    }

    pressStartButton(){

        let masgOne =this.start();
        let msgTwo = this.brewCoffee();

        return `${masgOne} ${msgTwo}`

    }

}

let myMachine = new CoffeMachine();
console.log(myMachine.start());
console.log(myMachine.brewCoffee());

console.log(myMachine.pressStartButton());










// polymorphism

class Bird {

    fly(){
        return "flying....";
    }
}


class Penguin extends Bird {

    fly(){
        return "Penguins can't fly";
    }
}


let bird = new Bird();
console.log(bird.fly());

let penguin = new Penguin();
console.log(penguin.fly());










// static method

class Calculator{

    static add(a , b){
        return a + b ;
    }
}


/* let iniCalc = new Calculator();
console.log(iniCalc.add(2 , 3)); */   //if you use static method you dont need to create an object.

console.log(Calculator.add(2 , 3));










// getter and setter

class Employee {

    #salary ;

    constructor(name , salary){
        this.name = name;
        this.#salary = salary;
    }

    get salary(){
        return this.#salary;
    }

    set salary(salary){
        this.#salary = salary;
    }
}

let emp = new Employee("ashen" , 10000);
console.log(emp.name);
console.log(emp.#salary);

console.log(emp.salary);