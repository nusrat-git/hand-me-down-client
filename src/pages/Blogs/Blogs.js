import React from 'react';
import useTitle from '../../hooks/useTitle';


const callouts = [
    {
        name: ' What are the different ways to manage a state in a React application?',
        description: `Local (UI) state – Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook.For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.Global (UI) state – Global state is data we manage across multiple components. Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least. A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.Server state – Data that comes from an external server that must be integrated with our UI state.Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.URL state – Data that exists on our URLs, including the pathname and query parameters.URL state is often missing as a category of state, but it is an important one.In many cases, a lot of major parts of our application rely upon accessing URL state. `,
    },
    {
        name: 'How does prototypical inheritance work?',
        description: ` prototypical inheritance refers to the ability to access object properties from another object. We use a JavaScript prototype to add new properties and methods to an existing object constructor. We can then essentially tell our JS code to inherit properties from a prototype. Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to another through a reference pointer function.All JavaScript objects inherit properties and methods from a prototype: Date objects inherit from Date.prototype.Array objects inherit from Array.prototype.Player objects inherit from Player.prototype.The Object.prototype is on top of the prototype inheritance chain. ​ Date objects, Array objects, and Player objects all inherit from Object.prototype.`
    },
    {
        name: 'What is a unit test? Why should we write unit tests?',
        description: `Unit Testing is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object.In SDLC, STLC, V Model, Unit testing is first level of testing done before integration testing. Unit testing is a WhiteBox testing technique that is usually performed by the developer. Though, in a practical world due to time crunch or reluctance of developers to tests, QA engineers also do unit testing.Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could’ve been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system.
        Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.
        It simplifies the debugging process.
        Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy.
        Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.
        Unit testing improves code coverage. A debatable topic is to have 100% code coverage across your application.
        In the testing pyramid, unit tests are faster than integration and end-to-end. They are more assertive and return quick feedback. `,
    },
    {
        name: 'React vs. Angular vs. Vue?',
        description: `Angular.js uses the two-way binding. The state of the model is changed first, and then the modification of the interface element is reflected. The interface element changes as the model’s state changes, which is why two-way data binding is used.

        React.js has one-way binding. First, the state of the model is updated, and then it reflects the change of the interface element. If you change the interface element, the state of the model stays the same.
        
        As on Angular, the data binding on Vue.js is two-way. Vue.js synchronizes the entire model with the DOM mechanically. This implies that all Vue.js templates are fundamentally legal, parsable HTML with a few extra features. Remember this because Vue templates are fundamentally different from string-based templates.Angular is written in TypeScript, which means you need some time to learn it to work with this framework.

        React uses JSX and native Javascript developers are familiar with it. The training period is easier and does not require that much preparation.
        
        Vue.js makes use of an HTML-based template syntax that allows you to link the displayed DOM to the data of the base element instance declaratively. All Vue.js templates are valid HTML that can be read by HTML analyzers and browsers that follow the standard.To capture all changes to the DOM, Angular.js creates a watcher for each binding. Every time the view updates, the new values compare with the old ones. This can end up in poorer performance in large mobile applications.

        Because React uses a virtual DOM, when the view is modified, the new DOM compares it to the virtual DOM and changes accordingly.
        
        Vue.js has better performance thanks to the virtual DOM, which is useful for complicated programs. It may be as little as 20KB while maintaining its speed and versatility, allowing it to achieve considerably better performance than competing frameworks.`,
    },
]

const Blogs = () => {
    useTitle('Blogs');
    return (
        <div>
            <div className="bg-gray-100 mt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Blogs</h2>

                        <div className="mt-6 space-y-12 grid grid-cols-1 gap-20 lg:space-y-0">
                            {callouts.map((callout) => (
                                <div key={callout.name} className="group relative shadow-lg rounded-3xl md:p-10">
                                    <h3 className="mt-6 text-2xl font-bold mb-6 text-gray-500">
                                        {callout.name}
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;