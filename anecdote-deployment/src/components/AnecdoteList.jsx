import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdoteFromThunk } from '../reducers/anecdoteReducer';
import { raiseNotificationThunk } from '../reducers/notificationReducer';
import Notification from './Notification';
import { useState } from 'react';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
	const [notificationEnabled, setNotificationEnabled] = useState(false);
	const anecdotes = useSelector(state => state.anecdotes.filter(anecdoteObj => anecdoteObj.content.includes(state.filter)));
	const notificationMsgInState = useSelector(state => state.notification);

	const dispatch = useDispatch();
	const vote = anecdote => {
		dispatch(voteAnecdoteFromThunk(anecdote));
		dispatch(raiseNotificationThunk(`You voted '${anecdote.content}'`, 3));
	};

	return (
		<div>
			{notificationMsgInState !== '' && <Notification />}
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote => (
					<Anecdote theAnecdote={anecdote} voteAction={vote} />
				))}
		</div>
	);
};

export default AnecdoteList;
