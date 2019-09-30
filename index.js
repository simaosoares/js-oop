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
