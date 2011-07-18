var path = process.argv[2],
    http = require('http'), 
    fs = require('fs'),
    Router = require('biggie-router'),
    yaml = require('yaml');

var router = new Router();

fs.readFile('spec.yaml', function(err, fileContents) {
    fileContents = fileContents.toString()
    var config = yaml.eval(fileContents);
    for (var model in config) {
        router.get('/').get('/' + model.replace(/_/g,'/') )
              .bind(function (request, res, next) {
                  var pathname = require('url').parse(request.url)['pathname'];
                  var p = pathname.substring(1).replace(/\//g,'_');
                  console.log(p);
                  res.end(JSON.stringify(config[p]));
              });
    }
});

router.listen(8080);
console.log('Mocking Bird running at http://127.0.0.1:8080/');
