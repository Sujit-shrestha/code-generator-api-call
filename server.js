const express = require('express');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.json());

// Define a route to render the HTML file
app.get('/', (req, res) => {
  res.render('index');
});
app.post('/generate', (req, res) => {
  const apiUrl = 'https://harkirat.classx.co.in/api/generate-code';

  const { instruction } = req.body;
  const postData = {
    language: 'javascript',
    instruction,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        console.log('Failed to send POST request');
        res.status(500).send('Internal Server Error');
      }
    })
    .then(responseBody => {
      //console.log(responseBody);
      res.send(responseBody);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
});
// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});
