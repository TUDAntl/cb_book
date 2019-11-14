var http = require('http');
var functions = require('./functions');
var fs = require('fs');

function onRequest(request, response){
    response.writeHead(200, {'Content-Type':'text/html'});
    fs.readFile('./index.html', null, function(error, data){
        if(error){
            response.writeHead(404);
            response.write('Error, File not found');
        }else{
            response.write(data);
        }
    response.end();
    });

    functions.myFunc();
}


http.createServer(onRequest).listen(5000);