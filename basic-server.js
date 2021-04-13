const http = require('http');

    const send = (payload,code) => {
      const payloadStr = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(code);
      res.write(payloadStr);
      res.end("\n");
    }

const routes = {
    user: function (data, res){

        let payload = {
            name: "Kenny" 
        };
      
        send()
    },
    cartman: function(data, res) {

        let payload = {
          name: "Cartman"
        };
       
        send()
    },

    notFound: function(data, res) {
        let payload = {
          message: "File Not Found",
          code: 404
        };
        send()
      }
}

const server = http.createServer(function(req, res){
    const protocol = req.headers.referer ? req.headers.referer.split(":")[0]: "http";
    const fullUrl = protocol + '://' +  req.headers.host;
    const parsedURL = new URL(req.url, fullUrl);
    const path = parsedURL.pathname.replace(/^\/+|\/+$/g, "");
    let qs = parsedURL.query;
    let headers = req.headers;
    let method = req.method.toLowerCase();

    req.on("data", function() {
        console.log("got some data");
    });
    req.on("end", function() {
        console.log("send a response");
        let route =
          typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
        let data = {
          path: path,
          queryString: qs,
          headers: headers,
          method: method
        };
        route(data, res);
    });
});

server.listen(1111, function (){
    console.log("Listening on port 1111");
});
