Why Mocking Bird
================

API is the law of entire software project. It should reviewed as early as possible. But in reality, it begins with a document, people try to add a lot of things in it. In the end, a bloat API spec is born. It's hard to implement, hard to use (you need to reference document), and finally everyone hates it.

By learning from "how to Desgin a good API and why it matters" by Joshua Bloch, a API spec should

 * short (1 page rule them all)
 * start *before* you've implement the API

Therefore, Mocking Bird is born. It reads a human readible YAML file as API specication and start a node.js server serving your API. You can use HTTP call immediately to see how your API works in no time. No coding required, go try it now.

Prerequisite
============

    % cd ~
    % npm install yaml biggie-router rbytes node-static
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

Test it
=======

    % curl -d "creator_id=be8afc91b69d11e08303109a&creation_device_name=android&text=somethingherer" http://[IP]:8080/api/0/article
    {
	    "creator_id": "be8afc91b69d11e08303109a",
	    "creation_device_name": "android",
	    "text": "somethingherer",
	    "timestamp": "2011-07-21T11:09:20.074773",
	    "comment_count": 0,
	    "comments": [],
	    "files": [],
	    "id": "81286c2d6b6e19bde013ac9919d22f041ca4ea14b855f9a0"
	}
	
Todo
====

 * RESTful support