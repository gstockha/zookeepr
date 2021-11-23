const express = require('express');
const app = express(); //instantiate server
const { animals } = require('./data/animals'); //destruct all the animal from the object

app.listen(3001, ()=>{
    console.log('API server now on port 3001!');
});

function filterByQuery(query, animalsArray) {
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
          personalityTraitsArray = [query.personalityTraits];
        } else {
          personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
          filteredResults = filteredResults.filter(
            //we add it to the new list it it's index isn't -1 (it exists)
            animal => animal.personalityTraits.indexOf(trait) !== -1
          );
        });
    }
    if (query.diet) { //if query object 'diet' is not undefined
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) { //if req.query is not undefined
      results = filterByQuery(req.query, results);
    }
    res.json(results);
});