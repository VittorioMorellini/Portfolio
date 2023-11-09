// Server for Next 13.5+
const http = require('http')
const path = require('path')
const url = require('url')
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;
const dir = path.join(__dirname)
const app = next({ dev, dir, hostname, port })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    http.createServer(async (req, res) => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const { pathname, query } = parsedUrl;
            if (pathname === "/a") {
                await app.render(req, res, "/a", query);
            } else if (pathname === "/b") {
                await app.render(req, res, "/b", query);
            } else {
                await handle(req, res, parsedUrl);
            }
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    })
    .once("error", (err) => {
        console.error(err);
        process.exit(1);
    })
    .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});