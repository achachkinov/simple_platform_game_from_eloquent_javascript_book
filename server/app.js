const express = require('express');
const path = require('path'); // Node.js module for working with file paths

const app = express();
const port = 3000;

// Serve static files from the parent directory (where index.html is)
// path.join(__dirname, '..') creates a correct path to the '17_canvas' directory.
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    // path.join constructs an absolute path to your file.
    res.sendFile(path.join(__dirname, '.', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('It should now be serving your game!');
});