const supertest = require('supertest');
const mongoose = require('mongoose');
const { test, describe, after, beforeEach } = require('node:test');
const app = require('../index');
const api = supertest(app);
const assert = require('assert');

const Anecdote = require('../models/anecdote');
const helper = require('./test_helper');

describe('when there is initially some anecdotes saved', () => {
  beforeEach(async () => {
    await Anecdote.deleteMany({});

    const anecdoteObjects = helper.initialAnecdotes.map(anecdote => new Anecdote(anecdote));

    const promiseArray = anecdoteObjects.map(anecdote => anecdote.save());
    await Promise.all(promiseArray);
  });

  test('anecdotes are returned as json', async () => {
    const response = await api
      .get('/anecdotes')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, helper.initialAnecdotes.length);
  });

  test('anecdotes are returned with id property', async () => {
    const response = await api.get('/anecdotes');
    response.body.forEach(anecdote => {
      assert(anecdote.id);
    });
  });

  test('a valid anecdote can be added ', async () => {
    const newAnecdote = {
      content: 'the brand new anecdote',
      votes: 0,
    };

    const postResponse = await api
      .post('/anecdotes')
      .send(newAnecdote)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(postResponse.body.content, newAnecdote.content);
    assert.strictEqual(postResponse.body.votes, newAnecdote.votes);

    await api.get('/anecdotes');

    const anecdotesAtEnd = await helper.anecdotesInDb();

    const contents = anecdotesAtEnd.map(anecdote => anecdote.content);

    assert(contents.includes('the brand new anecdote'));
  });

  test('if votes property is missing, it will default to 0', async () => {
    const newAnecdote = {
      content: 'yihaaoo! yippie..',
    };

    const postResponse = await api
      .post('/anecdotes')
      .send(newAnecdote)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(postResponse.body.votes, 0);
  });

  test('anecdote without content is not added', async () => {
    const newAnecdote = {
      votes: 5,
    };

    await api.post('/anecdotes').send(newAnecdote).expect(400);

    const anecdotesAtEnd = await helper.anecdotesInDb();

    assert.strictEqual(anecdotesAtEnd.length, helper.initialAnecdotes.length);
  });

  after(() => {
    mongoose.connection.close();
  });
});
