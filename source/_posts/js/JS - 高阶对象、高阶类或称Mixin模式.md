---
title: js-高阶对象
date: 2019-06-21 18:46:41
tags:
- js
categories:
- js
---
@[toc](高阶对象、高阶类或称Mixin模式)
Mixin模式，混合模式

JS是基于对象的，类和对象都是对象模板
混合mixin，指的是将一个对象的全部或者部分拷贝到另一个对象上去。其实就是属性
可以将多个类或对象混合成一个类或对象
# 继承实现
继承：子子孙孙都有基类的功能
```js
class Serialization {
    constructor() {
        console.log('Serialization constructor~~~');
        if (typeof (this.stringify) !== 'function') {
            throw new ReferenceError('should define stringify.');
        }
    }
}

class Point extends Serialization {
    constructor(x, y) {
        console.log('Point Constructor~~~~');
        super(); // 调用父构造器
        this.x = x;
        this.y = y;
    }
}

//s = new Serialization(); // 构造Serialization失败
//p = new Point(4,5); // 构造子类对象时，调用父类构造器执行也会失败
```
父类构造函数中，要求具有属性是stringify的序列化函数，如果没有则抛出异常
## 完整继承的代码
```js
class Serialization {

    constructor() {
        console.log('Serialization constructor~~~');
        if (typeof (this.stringify) !== 'function') {
            throw new ReferenceError('should define stringify.');
        }
    }
}
class Point extends Serialization {

    constructor(x, y) {
        console.log('Point Constructor~~~~');
        super(); // 调用父构造器
        this.x = x;

        this.y = y;
    }

    stringify() {
        return `<Point x=${this.x}, y=${this.y}>`
    }
}
class Point3D extends Point {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }

    stringify() {
        return `<Point x=${this.x}, y=${this.y}, z=${this.z}>`
    }
}

p = new Point(4, 5);
console.log(p.stringify())
p3d = new Point3D(7, 8, 9);
console.log(p3d.stringify());

/* 执行结果
Point Constructor~~~~
Serialization constructor~~~
<Point x=4, y=5>
Point Constructor~~~~
Serialization constructor~~~
<Point x=7, y=8, z=9>
*/
```
# 高阶对象实现
将类的继承构建成箭头函数
```js
// 普通的继承
class A extends Object { };
console.log(A);

// 匿名类
const A1 = class {
    constructor(x) {
        this.x = x;
    }
}
console.log(A1);
console.log(new A1(100).x);

// 匿名继承
const B = class extends Object {
    constructor() {
        super();
        console.log('B constructor');
    }
};
console.log(B);
b = new B();
console.log(b);

// 箭头函数，参数是类，返回值也是类
// 把上例中的Object看成参数
const x = (Sup) => {
    return class extends Sup {
        constructor() {
            super();
            console.log('C constructor');
        }
    };
}

// 演化成下面的形式
const C = Sup => class extends Sup {
    constructor() {
        super();
        console.log('C constructor');
    }
};

//cls = new C(Object); // 不可以new，因为C是一个普通函数，它的返回值是一个带constructor的类
cls = C(A); // 调用它返回一个类，一个带constructor的class
console.log(cls);
c = new cls();
console.log(c);

// 其它写法
c1 = new (C(Object))(); // new优先级太高了，所有后面要加括号才能先调用

/* 执行结果
[Function: A]
[Function: A1]
100
[Function: B]
B constructor
B {}
[Function: A]
C constructor
A {}
C constructor
*/
```
说到底，上面的C这个函数，本质上就是传入一个基类，然后通过基类继承构造一个新的类。
## Mixin类
缺什么能力 补什么能力
- 可以改造上面序列化的例子
```js
const SerializationMixin = Sup => class extends Sup {
    constructor(...args) {
        console.log('SerializationMixin constructor~~~');
        super(...args);
        if (typeof (this.stringify) !== 'function') {
            throw new ReferenceError('should define stringify.');
        }
    }
}

class Point {
    constructor(x, y) {
        console.log('Point Constructor~~~~');
        this.x = x;
        this.y = y;
    }
}

class Point3D extends SerializationMixin(Point) {
    constructor(x, y, z) {
        super(x, y); // super是Serialization(Point)包装过的新类型

        this.z = z;
    }

    stringify() {
        return `<Point3D ${this.x}.${this.y}.${this.z}>`;
    }
}

let p3d = new Point3D(70, 80, 90);
console.log(p3d.stringify());

/*执行结果
SerializationMixin constructor~~~
Point Constructor~~~~
<Point3D 70.80.90>
*/
```
**注意：**
- Serialization(Point)这一步实际上是一个匿名箭头函数调用，返回了一个新的类型，Point3D继承自这个新的匿名
类型，增强了功能。
- React框架大量使用了这种Mixin技术

Serialization(Point)传入的参数是类，返回值也是一个类，这就是高阶类
