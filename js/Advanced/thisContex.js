const person = {
    name : "ashen" ,

    greet(){
        console.log(`hello ${this.name}`);  
    }
}


person.greet();

const greetFubction = person.greet;
greetFubction();

// in this case when we assign it another variable it will not pass thee context thats why "this" keyword comes up

