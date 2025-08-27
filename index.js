// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send(`Hello from CI/CD demo! Commit: ${process.env.GIT_COMMIT || 'local'}`);
});
app.listen(PORT, () => console.log(`Server listening ${PORT}`));
