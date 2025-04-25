import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdoteFromThunk } from '../reducers/anecdoteReducer';
import { raiseNotificationThunk } from '../reducers/notificationReducer';
import Notification from './Notification';
import { useState } from 'react';

const AnecdoteList = () => {
	const [notificationEnabled, setNotificationEnabled] = useState(false);
	const anecdotes = useSelector(state => state.anecdotes.filter(anecdoteObj => anecdoteObj.content.includes(state.filter)));
	const notificationMsgInState = useSelector(state => state.notification);

	const dispatch = useDispatch();
	const vote = anecdote => {
		dispatch(voteAnecdoteFromThunk(anecdote));
		dispatch(raiseNotificationThunk(`You voted '${anecdote.content}'`, 3));
	};
	const style = {
		marginBottom: 5,
		border: '1px dotted grey',
	};

	return (
		<div>
			{notificationMsgInState !== '' && <Notification />}
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote => (
					<div key={anecdote.id} style={style}>
						<div>
							<p className="fst-italic p-1">{anecdote.content}</p>
						</div>
						<div className="d-flex justify-content-end align-items-center m-2">
							<p className="fw-light mb-0">has {anecdote.votes} votes</p>
							<button className="btn btn-primary btn-sm mx-2" onClick={() => vote(anecdote)}>
								vote
							</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default AnecdoteList;
