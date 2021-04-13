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
    profile: function (data, res){

        const payload = {
            name: "Sherman" 
        };
      
        send(payload, 200)
    },
    shipment: function(data, res) {
        const payload = {
            address: {
                street: "Narra Street",
                city: "Parañaque city"
            }
        };
       
        send()
    },

    notFound: function(data, res) {
        const payload = {
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

server.listen(5050, function (){
    console.log("Listening on port 5050");
});
