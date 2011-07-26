# Mocking Bird

API is the law of an entire software project.  It should reviewed as early as possible.  Instead of beginning with a document, people try to append a lot of things and bloat the spec, making it hard to implement, difficult to use without referencing the document, and creates hatred around the API.

By learning from *How to Design a Good API and Why It Matters* by Joshua Bloch, an API spec should be…

 * very short (1 page rule them all)
 * started *before* you’ve started implementing the API

Mocking Bird is an API mocking server driven by a human-readable YAML file, created using node.js.  You can try all the method calls immediately to see how your API works, in little to no time.  There is no back-end coding required; go try it now.

## Bootstrapping

    % cd ~
    % npm install yaml biggie-router rbytes node-static
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

## Test it

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
	
## Todo

 *	RESTful support
