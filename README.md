# Mocking Bird

API is the law of an entire software project.  It should reviewed as early as possible.  Instead of beginning with a document, people try to append a lot of things and bloat the spec, making it hard to implement, difficult to use without referencing the document, and creates hatred around the API.

By learning from *How to Design a Good API and Why It Matters* by Joshua Bloch, an API spec should be…

 * very short (1 page rule them all)
 * started *before* you’ve started implementing the API

Mocking Bird is an API mocking server driven by a human-readable YAML file, created using node.js.  You can try all the method calls immediately to see how your API works, in little to no time.  There is no back-end coding required; go try it now.

## Bootstrapping

    % cd ~
    % npm install yaml biggie-router
    % npm install supervisor -g

## Running MockingBird

    % node mocking.js
    % curl http://localhost:8080/users 
    {"status":200,"count":3 ...
    %

## Running MockingBird in drafting mode

    % supervisor mocking.js
    % curl http://localhost:8080/users 
    {"status":200,"count":3 ...
    %

## Todo

 *	RESTful support
