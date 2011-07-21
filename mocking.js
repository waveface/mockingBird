var http = require('http'), 
    fs = require('fs'),
    querystring = require('querystring'),
    rbytes = require('rbytes'),
    router = new (require('biggie-router')),
    timestamp = '2011-07-21T11:09:20.074773',
    yaml = require('yaml');

fs.readFile('dummy.json', function(err, file) {
    var contents = file.toString();
    var dummy = eval('(' + contents + ')');
    var articleRegExp = new RegExp('/0/article/(\\w+)$');
    var commentsRegExp = new RegExp('/0/article/(\\w+)/comments$');

    router.get('/0/articles')
        .bind(function (req, res, next) {
            var body = {};

            body['timestamp'] = timestamp;
            body['is_end'] = true;
            body['article_count'] = dummy['articles'].length;
            body['articles'] = dummy['articles'];
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(body));
        });

    router.get(articleRegExp)
        .bind(function (req, res, next) {
            var article_id = articleRegExp.exec(req.url)[1];
            var article = findById(dummy['articles'], article_id);
            if (article != null) {
                res.write(JSON.stringify(article));
            }
            res.end();
        });

    router.get(commentsRegExp)
        .bind(function (req, res, next) {
            var article_id = commentsRegExp.exec(req.url)[1];
            var article = findById(dummy['articles'], article_id);
            if (article != null) {
                var comments = article['comments'];
                res.write(JSON.stringify(comments));
            }
            res.end();
        });

    router.post('/0/article')
        .bind(function (req, res, next) {
            var fullBody = '';
            req.on('data', function(chunk) {
                fullBody += chunk.toString();
            });

            req.on('end', function() {
                var article = {};
                var body = querystring.parse(fullBody);
                res.writeHead(200, {'Content-Type': 'application/json'});
                article['creator_id'] = body.creator_id;
                article['creation_device_name'] = body.creation_device_name;
                article['text'] = body.text;
                article['timestamp'] = timestamp;
                article['comment_count'] = 0;
                article['comments'] = [];
                article['files'] = [];
                article['id'] = rbytes.randomBytes(24).toHex();
                res.end(JSON.stringify(article));
            });
        });

    router.post('/0/file')
        .bind(function (req, res, next) {
            var fullBody = '';
            req.on('data', function(chunk) {
                fullBody += chunk.toString();
            });

            req.on('end', function() {
                var file = {};
                var body = querystring.parse(fullBody);
                res.writeHead(200, {'Content-Type': 'application/json'});
                file['id'] = rbytes.randomBytes(24).toHex();
                file['creator_id'] = body.creator_id;
                file['type'] = 'public.image';
                file['timestamp'] = timestamp;
                file['url'] = 'http://localhost/NOT_YET_IMPLEMENT';
                file['thumbnail_url'] = 'http://localhost/NOT_YET_IMPLEMENT';
                file['text'] = '';
                res.end(JSON.stringify(file));
            });
        });

});

function findById (elements, id) {
    for (var key in elements) {
        if (elements[key]['id'] == id) {
            return elements[key];
        }
    }
    return null;
}

router.listen(8080);
console.log('Mocking Bird running at http://127.0.0.1:8080/');
