const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const fs = require('fs');

// Read the JSON file with your data
const rawData = fs.readFileSync('davidgogginsquote.json');
const quotesData = JSON.parse(rawData);


// Get a random quote
app.get('/api/quotes', (req, res) => {
  const randomCategory = quotesData.categories[Math.floor(Math.random() * quotesData.categories.length)];
  const randomQuote = randomCategory.quotes[Math.floor(Math.random() * randomCategory.quotes.length)];
  res.json(randomQuote);
});

// Get a random quote from a specific category
app.get('/api/quotes/category/:category/random', (req, res) => {
    const category = req.params.category;
    const categoryData = quotesData.categories.find((cat) => cat.category === category);
  
    if (!categoryData) {
      return res.status(404).json({ error: 'Category not found' });
    }
  
    const randomQuote = categoryData.quotes[Math.floor(Math.random() * categoryData.quotes.length)];
    res.json(randomQuote);
  });
  

// Get a list of available categories
app.get('/api/categories', (req, res) => {
  const categories = quotesData.categories.map((cat) => cat.category);
  res.json(categories);
});
