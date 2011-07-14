var path = process.argv[2],
    http = require('http'), 
    fs = require('fs'),
    yaml = require('yaml');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    fs.readFile('spec.yaml', function(err, fileContents) {
      fileContents = fileContents.toString()
      console.log('\n')
      console.log(fileContents)
      console.log('\noutputs:\n')
      console.log(yaml.eval(fileContents))
      res.end('test in block\n')
    })
  res.write('test outside block\n')
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
