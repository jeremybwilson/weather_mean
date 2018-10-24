// include http, fs and url module
var http = require('http');
var fs = require('fs');

// create server listening on port 7077
var server = http.createServer(function (request, response){
    
    // this is how we do routing:
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    
    // for own .css files (not bootstrap on a cdn, this does not need configuartion)
    else if(request.url.endsWith('/css/styles.css')) {   
        fs.readFile('./css/styles.css', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(contents); 
            response.end();
        });
    }
    
    // for own .js files (not jquery on a cdn)
    else if(request.url.endsWith('/js/script.js')) {  
        fs.readFile('./js/script.js', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            response.write(contents); 
            response.end();
        });
    }
    
    // for image files
    else if(request.url.startsWith('/images')) {
        return fs.readFile('.'+request.url, function (errors, contents){
            response.writeHead(200, {'Content-Type': ['image/jpg', 'image/jpeg', 'images/png']});
            response.write(contents); 
            response.end();
        });
    }
    else {
        fs.readFile('index.html', function (errors, contents){
            response.writeHead(404,{'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
});

// tell your server which port to run on
server.listen(6543);

// print to terminal window
console.log("Running in localhost at port 6543");