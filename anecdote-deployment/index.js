const express = require('express');
var morgan = require('morgan');
const cors = require('cors');
const Anecdote = require('./models/anecdote');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

morgan.token('payload', function getBody(req) {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'));

app.get('/anecdotes', (request, response) => {
  Anecdote.find({}).then(result => {
    response.json(result);
  });
});

app.post('/anecdotes', (request, response) => {
  const body = request.body;
  console.log('request body is ', request.body);
  if (!body.content) return response.status(400).json({ error: 'content is missing' });
  // else if(persons.find(person=>person.name===body.name)) return response.status(400).json({error:'already in phonebook! name must be unique'})

  const anecdoteObj = new Anecdote({
    content: body.content,
    votes: body.votes | 0,
  });

  anecdoteObj
    .save()
    .then(result => {
      console.log(`added ${body.content} with votes ${body.votes} to the list of anecdotes`);
      response.json(result);
    })
    .catch(error => response.status(400).json({ error: error }));
});

app.put('/anecdotes/:id', (request, response, next) => {
  const body = request.body;

  const anecdote = {
    content: body.content,
    votes: body.votes,
  };

  Anecdote.findByIdAndUpdate(request.params.id, anecdote, { new: true, runValidators: true, context: 'query' })
    .then(updatedAnecdote => {
      response.json(updatedAnecdote);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error('From the - AllErrorsHandledAtSinglePlace handler', error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'the malformatted id' });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
