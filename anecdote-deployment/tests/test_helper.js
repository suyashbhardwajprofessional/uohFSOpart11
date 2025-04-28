const Anecdote = require('../models/anecdote');

const initialAnecdotes = [
  {
    content: 'the one to try zero one',
    votes: 1,
  },
  {
    content: 'the one to try zero two',
    votes: 2,
  },
  {
    content: 'the one to try zero three',
    votes: 3,
  },
  {
    content: 'the one to try zero four',
    votes: 4,
  },
];

anecdotesInDb = async () => {
  const anecdotes = await Anecdote.find({});
  return anecdotes.map(anecdote => anecdote.toJSON());
};

module.exports = {
  initialAnecdotes,
  anecdotesInDb,
};
