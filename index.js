// Factory Function
function createCircle(radius) {
    return {
        // ES5 radius: radius,
        radius, // ES6
        draw: function () {
            console.log('draw');
        }
    };
}

const circle = createCircle(1);
circle.draw();

// Constructor Function
function Circle(radius) {
    console.log('this', this);
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    }
}

// this' references the created object
const another = new Circle(1);

// 'this' references window object
const anotherOne = Circle(1);

// Functions are object
const Circle1 = new Function('radius', `    
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    }`);

const circle1 = new Circle1(50);
circle1.draw();

Circle.call({}, 1);
Circle.apply({}, [1, 2]);

// ///////////////////////////////////////////////////
// object properties
// ///////////////////////////////////////////////////
for (let key in circle) {
    if(typeof key !== 'function'){
        console.log(key, circle[key])
    }
}

const keys = Object.keys(circle);
console.log(keys);

if('radius' in circle){
    console.log('Circle has a radius.');
}

// ///////////////////////////////////////////////////
// abstraction - hide the details, show the essentials
// ///////////////////////////////////////////////////
function Circle(radius) {
    // all properties are public
    this.defaultLocation = { x: 0, y: 0};
    this.computeLocation = function () {

    };
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    };
}

// now hiding the details
function Circle(radius) {
    // private property
    let defaultLocation = { x: 0, y: 0};

    // private function
    function computeLocation() {
    }

    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    };
}

// ///////////////////////////////////////////////////
// getters and setters
// ///////////////////////////////////////////////////
function Circle(radius) {
    let defaultLocation = { x: 0, y: 0};
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    };

    this.getDefaultLocation = function () {
        return defaultLocation;
    };

    Object.defineProperty(this, 'defaultLocation', {
        get: function () {
            return defaultLocation;
        },
        set: function (value) {
            // add validation
            if(!value.x || !value.y) {
                throw new Error('Invalid location');
            }

            defaultLocation = value;
        }
    });
}
const newCircle = new Circle(20);
console.log(newCircle.getDefaultLocation());
console.log(newCircle.defaultLocation);
// if uncomment the next statement will throw an exception
// newCircle.defaultLocation = 1;


// ///////////////////////////////////////////////////
// Getting the prototype of an object
// ///////////////////////////////////////////////////
// https://tylermcginnis.com/beginners-guide-to-javascript-prototype/

function Animal (name, energy) {
    this.name = name;
    this.energy = energy;
}

Animal.prototype.eat = function (amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
};

Animal.prototype.sleep = function (length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
};

Animal.prototype.play = function (length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
};

const leo = new Animal('Leo', 7);
const prototype = Object.getPrototypeOf(leo);

console.log(prototype); // {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}

console.log(prototype === Animal.prototype); // true
