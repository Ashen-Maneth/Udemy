let computer = { cpu : 12 };

let lenovo = { 
    screen : "HD" ,
    __proto__ : computer // by using this we can access the properties of computer 
};

let tomHardware = {};

console.log(`computer ` , computer);
console.log(`lenovo ` , lenovo);

console.log(`computer ` , computer.__proto__); 
console.log(`lenovo ` , lenovo.__proto__); 






// ample use of prototype

let genericcar = {
    wheels : 4
};

let tesla = {
    driver : "AI"
};

Object.setPrototypeOf(tesla , genericcar);  // we can use this to set the prototype instead of using __proto__

console.log(`tesla ` , tesla);
console.log(`tesla.driver ` , tesla.driver);
console.log(`tesla.wheels ` , tesla.wheels);

console.log(`tesla ` , tesla.__proto__);   
console.log(`tesla` , Object.getPrototypeOf(tesla)); // we can use this to get the prototype instead of using __proto__
