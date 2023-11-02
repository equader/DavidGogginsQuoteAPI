const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Read and parse the JSON data file
const quotesData = JSON.parse(fs.readFileSync('davidgogginsquote.json', 'utf8'));

// Utility function to get a random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Endpoint to get a random quote from any category
app.get('/api/quotes', (req, res) => {
  const randomCategory = getRandomElement(quotesData.categories);
  const randomQuote = getRandomElement(randomCategory.quotes);
  res.json(randomQuote);
});

// Endpoint to get a random quote from a specific category
app.get('/api/quotes/category/:category/random', (req, res) => {
  const categoryData = quotesData.categories.find((cat) => cat.category === req.params.category);
  
  if (!categoryData) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const randomQuote = getRandomElement(categoryData.quotes);
  res.json(randomQuote);
});

// Endpoint to get a list of available categories
app.get('/api/categories', (req, res) => {
  const categories = quotesData.categories.map((cat) => cat.category);
  res.json(categories);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
