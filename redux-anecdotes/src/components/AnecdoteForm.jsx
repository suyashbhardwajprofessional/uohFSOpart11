import { useDispatch } from 'react-redux';
import { createAnAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';
import { createAnecdoteFromThunk } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnAnecdote = async event => {
		event.preventDefault();
		dispatch(createAnecdoteFromThunk(event.target.anecdote.value));
		event.target.anecdote.value = '';
	};

	return (
		<div className="input-group-text d-grid">
			<h2>create new</h2>
			<form onSubmit={addAnAnecdote}>
				<div>
					<input className="form-control" name="anecdote" placeholder="type in the new anecdote here.." />
				</div>
				<div className="d-grid my-2">
					<button className="btn btn-secondary">create</button>
				</div>
			</form>
		</div>
	);
};

export default AnecdoteForm;
