var http = require('http'), 
    fs = require('fs'),
    exec = require('child_process').exec,
    querystring = require('querystring'),
    rbytes = require('rbytes'),
    static = require('node-static'),
    router = new (require('biggie-router')),
    timestamp = '2011-07-21T11:09:20.074773',
    config = {},
    yaml = require('yaml');

fs.readFile('spec.yaml', function (err, file) {
    config = yaml.eval(file.toString());
    fs.readFile('dummy.json', readDummy);
});

function readDummy (err, file) {
	
    if (err || !file) {
        console.log("Error reading file: " + err);
        return;
    }
	
    var contents = file.toString();
    var dummy = eval('(' + contents + ')');
    var version = config['version'];

    var _getfn = function (json, urlExp, method) {
        var response = eval('('+json+')');
        router[method](urlExp)
            .bind(function(req, res, next) {
                var body = {};
                var params = querystring.parse(require('url').parse(req.url).query);
                console.log(params);
                for (var key in response) {
                    var match = null;
                    if (response[key].search('match') != -1) {
                        match = urlExp.exec(req.url);
                        if (match != null) {
                            match = match[1];
                        }
                    }
                    body[key] = eval(response[key]);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(body));
            });
    };

    var _postfn = function (json, urlExp) {
        var response = eval('('+json+')');
        router[method](urlExp)
            .bind(function(req, res, next) {
                var bodyText = '';
                req.on('data', function(chunk) {
                    bodyText += chunk.toString();
                });

                req.on('end', function() {
                    var body = {};
                    var params = querystring.parse(bodyText);
                    for (var key in response) {
                        body[key] = eval(response[key]);
                    }
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(body));
                });
            });
    };

    for (var k in config['api']) {
        var _fn = null;
        var api = config['api'][k],
            method = null,
            urlExp = new RegExp('/' + api['prefix'] + '/' +
                                version + '/' + api['url']);

        if (api['http_method'] == 'GET') {
            method = 'get';
            _fn = _getfn;
        } else if (api['http_method'] == 'POST') {
            method = 'post';
            _fn = _postfn;
        }
        else {
            continue;
        }

        _fn(JSON.stringify(api['response']), urlExp, method)
    }

    var fileServer = new static.Server('./static');
    router.get(new RegExp("/images.*"))
        .bind(function(req, res, next) {
            req.addListener('end', function() {
                fileServer.serve(req, res);
            });
        });
};

function generateId() {
    return rbytes.randomBytes(24).toHex();
}

function findById (elements, id) {
    for (var key in elements) {
        if (elements[key]['id'] == id) {
            return elements[key];
        }
    }
    return null;
}



//  Bind Biggie Router to a port provided by Heroku’s Cedar stack or 8080 by default,
//  if app is launched via foreman or directly from node.

var listeningPort = process.env.PORT || 8080;
router.listen(listeningPort);
console.log('Mocking Bird running at port ' + listeningPort);
