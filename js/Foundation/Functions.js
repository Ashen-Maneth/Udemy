// write a basic function

function greet(name){
    console.log(`hello ${name}`);
}
greet("Ashen");



// write a function with return
function makeTea(typeFoTea){
    return `Your ${typeFoTea} tea is ready`;
    
}
let teaOrder = makeTea("Green tea")
console.log(teaOrder);




// write a function with a function
function orderTea(teaType){

    function confirmOrder(teaType){
        x = console.log(`Order confirmed for ${teaType}`);
    }

    confirmOrder(teaType);
}

orderTea("Lemon tea");




// write a function with arrow function
let calculateTotal = ((Price , Quantity) => {

    let totalCost = Price * Quantity ;
    return totalCost ;

});

console.log(calculateTotal(2 , 3));




// set function as the parameter of another function
function makeTea(typeFoTea) {
    return `Your ${typeFoTea} tea is ready`;
}

function ProcesssTeaOrder(teaFunction) {
    return teaFunction("Green tea");
}

console.log(ProcesssTeaOrder(makeTea));






// write a function that returns a function
function createTeaMaker() {
    return function(teaType) {
        return `Making ${teaType} tea`;
    };
}


let teaMaker = createTeaMaker();

console.log(teaMaker("Green tea")); 



