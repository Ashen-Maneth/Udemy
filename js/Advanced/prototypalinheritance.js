function Person(name){
    this.name = name ;
}


Person.prototype.greet = function(){
    console.log(`hello ${this.name}`) ;
}


let ashen = new Person("ashen");
ashen.greet();