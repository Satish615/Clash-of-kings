**`Singleton : `**
 
The Singleton Pattern limits the number of instances of a particular object to just one. Singletons are useful in situations where system-wide actions need to be coordinated from a single central place. 

_Example - Score in soccer game. You would have a Score class, with properties homeTeamScore and awayTeamScore and a method like increaseScore(team:Team)._

_Both teams must be able to increase their score when they make a goal, but you can't give each team their own Score instance; you want both to access and modify the same one._

_This is a case where a Singleton is a perfect solution, since it could work as a global instance that anybody can access; you will have just one instance for everyone, so you don't have to worry that each team will be modifying a different score._

JavaScript Sample Code - [Singleton.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/singleton.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-singleton.jpg)


***

**`Prototype : `**

The Prototype Pattern creates new objects, but rather than creating non-initialized objects it returns objects that are initialized with values it copied from a prototype or sample-object.This pattern is used when very similar objects are frequently created.

_Example - If we look at the below screenshot, We have a usecase where we should be able to create multiple similar objects on screen based on a prototype. Along the side of the map, we would have all the objects and tiles used in our game that can be placed on the map._

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/prototype_example.png)

JavaScript Sample Code - [Prototype.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/Prototype.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-prototype.jpg)

***


**`Factory : `**

A Factory Method creates new objects as instructed by the client. One way to create objects in JavaScript is by invoking a constructor function with the new operator. The Factory Method allows the client to delegate object creation while still retaining control over which type to instantiate. 

_Example - An example of this would be a ShapeFactory, which is for creating game objects. There are possibly many shapes to choose from and each needs to be constructed from specified procedurally. A Factory allows you to request any particular shape with just an parameter.Based on different parameters, the factory produce different stuff. As we can also see in the screen-shot of previous example we can use a FactoryMethod to create objects of different shapes._

JavaScript Sample Code - [Factory.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/factory.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-factory-method.jpg)

***


**`Abstract Factory : `**

An Abstract Factory creates objects that are related by a common theme. In object-oriented programming a Factory is an object that creates other objects. An Abstract Factory has abstracted out a theme which is shared by the newly created objects.

_Example - Suppose we have two Abstract Factories whose task it is to create page controls, such as, buttons, textboxes, radio buttons, and listboxes. One is the Light Factory which creates controls that are white and the other the Dark Factory which creates controls that are black. Both Factories creates the same types of controls, but they differ in color, which is their common theme. This is an implementation of the Abstract Factory pattern._

JavaScript Sample Code - [AbstractFactory.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/AbstractFactory.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-abstract-factory.jpg)

***

