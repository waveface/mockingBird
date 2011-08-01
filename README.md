# Mocking Bird

Mocking Bird is an YAML-driven API mocking server implemented in Node.  We like bloat-free, easy-to-implement mocks a lot more over conventional design approaches which often start with a document.


## Bootstrapping and running the app locally

Simply call `npm install`.  All the dependencies are listed in `package.json` for `npm` to reference.

    % npm install

After this, you can either run the app thru the `foreman` gem (thru `foreman start`) or run it directly using Node:

    % node mocking.js

To run MockingBird in drafting mode, install `supervisor`:
    
    % npm install supervisor -g


## Hosting

The application can be hosted on Heroku using the Cedar stack.  To provision a Celadron Cedar stack, follow instructions on [Getting Started With Node.js on Heroku/Cedar](http://devcenter.heroku.com/articles/node-js).

Notice that Heroku push ignores all Git branches other than `master`.  If you are testing a custom branch, do this to push contents on your own branch as `master` on Heroku:

    % git push heroku -f myBranch:master

If anything went wrong, use this:

    % heroku logs


## Test it

    % curl -d "creator_id=be8afc91b69d11e08303109a&creation_device_name=android&text=somethingherer" http://<host:port>/api/0/article
    
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

  * RESTful support
