const http = require("http");
const port = process.env.PORT || 5000;

http
    .createServer((req, res) => {
        res.writeHead(200, {"Content-Type": "text/html"});

    const url = req.url;

        if(url === "/profile") { 
            res.write("<h1>Welcome to your profile</h1>");
            res.end();
        }
        else if (url === "/shipment"){
            const payload = {
                address: {
                    street: "Narra Street",
                    city: "Parañaque"
                }
            };
            res.writeHead(200, {"Content-type": "application/json "});
            res.write(JSON.stringify(payload));
            res.end();
        }

        else{
            res.write("<h1>Hey there!</h1>");
            res.end();
        } 

    })
    .listen(port, () => {
        console.log(`Server listening on port ${port}...`)
    });