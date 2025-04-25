import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import VisibilityFilter from './components/VisibilityFilter';
import { initializeAnecdotesFromThunk } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotesFromThunk());
  }, []);

  return (
    <div className="container py-5">
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
