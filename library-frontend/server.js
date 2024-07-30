/* eslint-disable */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port: ${port}`);
  }
});