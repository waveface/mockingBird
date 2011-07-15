Why Mocking Bird
================

API is the law of entire software project. It should reviewed as early as possible. But in reality, it begins with a document, people try to add a lot of things in it. In the end, a bloat API spec. It's hard to implement, hard to use (you need to reference document), and finally everyone hates it.

By learning from "how to Desgin a good API and why it matters" by , a API spec should be

 * short (1 page rule them all)
 * start *before* you've implement the API

Therefore, Mocking Bird is born. It reads a human readible YAML file as API specication and start a node.js server serving your API. You can use HTTP call immediately to see how your API works in no time. No coding required, go try it now.

Prerequisite
============

    % cd ~
    % npm install yaml biggie-router
    % npm install supervisor -g

Run It
======

    % node mocking.js
    % curl http://localhost:8080/users 
    {"status":200,"count":3 ...
    %

Run It (in drafting mode)
=========================

    % supervisor mocking.js
    % curl http://localhost:8080/users 
    {"status":200,"count":3 ...
    %

Todo
====

 * RESTful support