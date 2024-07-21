import express from "express";
import path, { dirname } from 'path';

import fs from "fs";
import https from "https";
const privateKey = fs.readFileSync("client-key.pem");
const certificate = fs.readFileSync("client-cert.pem");
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Use port 443 for HTTPS; you might need sudo to run on port 443
const port = 443;

httpsServer.listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
