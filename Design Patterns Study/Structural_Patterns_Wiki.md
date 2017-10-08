**`Proxy : `**
 
The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object. 

In object-oriented programming, objects do the work they advertise through their interface (properties and methods). Clients of these objects expect this work to be done quickly and efficiently. However, there are situations where an object is severely constrained and cannot live up to its responsibility. Typically this occurs when there is a dependency on a remote resource (resulting in network latency) or when an object takes a long time to load.

In situations like these you apply the Proxy pattern and create a proxy object that ‘stands in’ for the original object. The Proxy forwards the request to a target object. The interface of the Proxy object is the same as the original object and clients may not even be aware they are dealing with a proxy rather than the real object 

JavaScript Sample Code - [Proxy.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/Proxy.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-proxy.jpg)

***

**`Decorator : `**

The Decorator pattern extends (decorates) an object’s behavior dynamically. The ability to add new behavior at runtime is accomplished by a Decorator object which ‘wraps itself’ around the original object. Multiple decorators can add or override functionality to the original object

Decorators provide flexibility to statically typed languages by allowing runtime changes as opposed to inheritance which takes place at compile time. JavaScript, however, is a dynamic language and the ability to extend an object at runtime is baked into the language itself. 

Example : Security management where business objects are given additional access to privileged information depending on the privileges of the authenticated user. For example, an HR manager gets to work with an employee object that has appended (i.e. is decorated with) the employee's salary record so that salary information can be viewed. 

JavaScript Sample Code - [decorator.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/decorator.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-decorator.jpg)

***
**`Facade : `**
 
The Façade pattern provides an interface which shields clients from complex functionality in one or more subsystems. It is a simple pattern that may seem trivial but it is powerful and extremely useful. It is often present in systems that are built around a multi-layer architecture.

The intent of the Façade is to provide a high-level interface (properties and methods) that makes a subsystem or toolkit easy to use for the client. 

Example - On the server, in a multi-layer web application you frequently have a presentation layer which is a client to a service layer. Communication between these two layers takes place via a well-defined API. This API, or façade, hides the complexities of the business objects and their interactions from the presentation layer. 

Façades are used is in refactoring. Suppose you have a confusing or messy set of legacy objects that the client should not be concerned about. You can hide this code behind a Façade. The Façade exposes only what is necessary and presents a cleaner and easy-to-use interface. 

JavaScript Sample Code - [facade.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/facade.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-facade.jpg)

***

**`Composite : `**
 
The Façade pattern provides an interface which shields clients from complex functionality in one or more subsystems. It is a simple pattern that may seem trivial but it is powerful and extremely useful. It is often present in systems that are built around a multi-layer architecture.

The intent of the Façade is to provide a high-level interface (properties and methods) that makes a subsystem or toolkit easy to use for the client. 

Example - On the server, in a multi-layer web application you frequently have a presentation layer which is a client to a service layer. Communication between these two layers takes place via a well-defined API. This API, or façade, hides the complexities of the business objects and their interactions from the presentation layer. 

Façades are used is in refactoring. Suppose you have a confusing or messy set of legacy objects that the client should not be concerned about. You can hide this code behind a Façade. The Façade exposes only what is necessary and presents a cleaner and easy-to-use interface. 

JavaScript Sample Code - [composite.js](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/composite.js)

![](https://github.com/nguyensjsu/cmpe202-fivestars/blob/master/Design%20Patterns%20Study/javascript-composite.jpg)

***