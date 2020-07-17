# Project Rebuild

This project will deliver a rebuild of the current tool with new WAI design (or ability for customization).

## Why rebuild? Why not refactor?

Piling of work to be done, requires loads of reading and document reasoning.

First attempt were to modernize the AngularJS (v1.X) code base, using the latest. Everything looked like to work. All good. Next thing is to update and patch all dependencies. Then moving away from Bower. This is when a complexer solution was required and a deeper understanding of the architectural choices made. This is the point of ejection out of refactoring. It started to look like there was a real big need of a mental model rewrite. Current MVC approach seems clear but it has several iteration spores / code practice changes that makes the project hard to understand.

Getting features out is cumbersome and hard for a newcomer. A rebuild will aim for simplicity,  maintainability and best practices over technical depth.


## Abstract

When building to achieve a maximized end-user reach, it is best to build from the very basics up to the desired endresult for modern browsers.

The pool of Front end development tools is overly saturated and offers too much to choose from. But when it comes down to supporting a broad audience, this pool tends to dry down to a handfull of solutions. Because best practices and code quality will then dictate the technology choice.

When it comes to maintainability and legacy support, code documentation is essential to express ideas and reasoning. It requires much more then using out of the box code transpilation when you want to create the best user experiences.

While black boxed code tools seem the best idea to cover great maintainability, the tools tend to break their promises when it comes to specific project needs. Configuration will always be required next to clear empathy driven documentation.

---

## Project Considerations

### Integration with WAI website

A best integration is probably gained by producing web components for the WAI specific to be refactored as white label component library later.

#### HTML templates

To be able to include an application in an exsisting structure the application is most easiest delivered as JavaScript application and hooks into a page on a dom node specified for the application to run in.

If we want to add prerendering the application into HTML and use things like hydration, we would need to be able to target a specific architecture. For WAI this is Jekyll. This kind of prerendering is possible but then for WAI the application code would be locked into a Jekyll ecosystem.

It is possible to use 11ty instead, which provides a good compatibility with Jekyll. But then it would still be locked into that same ecosystem of Liquid + frontmatter html templating.

PostHTML is a library that should be able to provide customization of the HTML templating with directives. In this way it is easier to write templating html specific for different targets, like PHP, Ruby or other JavaScript templating engines. But the setup can get very complex, meaning there are severall plugins required to configure for this to work which in turn is harder to maintain (#maintainability).

#### Styling

Styling is produced by the WAI website components. These are styles written in postcss, so can be included in source files.

Other possibility is to link to a generated WAI website css sheet. This provides faster automagical updates of UI styles, but is more error prone and changes are tracked outside of this project.

#### Scripts

Scripts used are plain JavaScript, but specific to the output of WAI website components. If possible, can be abstracted to give a usable API for other projects.

---

### Maintainability

The project needs to be reproducable and easily setup. This to ensure maintainable code. A way to do this is to use code generator tools that require minimal configuration. A build tool doing like such is ParcelJS, but will become harder to use when you require a specific setup. (Folder structure, tooling, prerendering). There are also some static site generators out there that work good with JS App Libraries, but they also have a fixed setup and come with the same configuration challenges, but do provide a better all in one solution.

A bigger win is to setup the project with code quality tools like linting and setup a best practices documentation. In this case code will be written in a repetitive and consistent way, which makes the code a lot more readable.

---

### Browser support for older agents

This means setting up to support Internet Explorer 11. A lot of users / readers still have to do with this browser due to the delivery of different Microsoft Windows products and organization server setups. This means writing stable and well known standardized code. Progressive enhancement principle is a good start to build the application upon (feature / support detection).

Tools like PostHTML, PostCSS and BabelJS provide a way to write the newest code. The tools will compile your code so that it is supported for your target audience. Be aware though, that using certain newer features may add a lot of supportive code that is required to use it. This will produce bigger files that end users need to download. Only need newest if really required.

Another approach is to only punnish IE11 users with a separate code bundle. This way you deliver fewer code to modern browsers and only deliver big files to IE11. But this feels like a contradicting approach.

Better approach would be to write code in a way that it makes transition to newer features possible, but still leverage the desired functionality, but in a supported way. (write code like it is 10 years ago, with the future in mind, without providing future functionality).
