const Anecdote = ({ theAnecdote, voteAction }) => {
	const style = {
		marginBottom: 5,
		border: '1px dotted grey',
	};

	return (
		<div key={theAnecdote.id} style={style} className="anecdote">
			<div>
				<p className="fst-italic p-1">{theAnecdote.content}</p>
			</div>
			<div className="d-flex justify-content-end align-items-center m-2">
				<p className="fw-light mb-0">has {theAnecdote.votes} votes</p>
				<button className="btn btn-primary btn-sm mx-2" onClick={() => voteAction(theAnecdote)}>
					vote
				</button>
			</div>
		</div>
	);
};

export default Anecdote;
