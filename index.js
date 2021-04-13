const http = require("http");

const send = (payload, code, res) => {
    const payloadStr = JSON.stringify(payload);
    res.setHeader("Content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(code);
    res.write(payloadStr);
    res.end();
};

const routes = {
    profile: function(data, res){
        console.log("test");
        console.log("<h1>Welcome to your profile</h1>");
        const payload = {
            name: "Sherman" 
        };
        send(payload, 200, res);

    },

    shipment: function(data, res){
        console.log("<h1>Shipment information</h1>");
        const payload = {
            address: {
                street: "Narra Street",
                city: "Parañaque"
            }
        };
        send(payload, 200, res);
    },

    notFound: function(data, res) {
        const payload = {
          message: "File Not Found"
        };
        send(payload, 404, res);
      }
        
};



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

server.listen(1000, function(){
    console.log("Listening on port 1000");
});