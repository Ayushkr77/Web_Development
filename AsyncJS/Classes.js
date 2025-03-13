// Class provides a blueprint for creating objects with properties and methods.

class Rectangle {
    constructor(width, height,color) {
        this.width = width;  // this refers to the newly created object (rect1).
        this.height = height;  
        // this.color=color;
    }
    // width, height are properties and area is a method
    area() {
        return this.width * this.height;
    }
}
const rect = new Rectangle(10, 5);  // Instance or object of rectangle class. Suppose the constructor has 2 parameters only width and height and here while creating object we passed more than 2, it'll not cause error and will ignore the later parameters passed here
console.log("Area of Rectangle:", rect.area());  




// Some More Classes
const date=new Date();
console.log(date.toISOString());
console.log(date.getDate());

const map=new Map();
map.set("name","John");
map.set("age",30);
map["id"]=1;
console.log(map.get("name"));  
console.log(map["id"]);