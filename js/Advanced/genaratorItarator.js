function* numberGenarator() {
    yield 1;
    yield 2;
    yield 3;
} 

let gen = numberGenarator();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);