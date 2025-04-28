/*01 one of the default loaded anecdotes appear on screen (content & votes are mentioned)
02 total number of anecdotes that appears on screen equal to the count of anecdotes saved to database
03 typing in the search string in filter box populates the relevant anecdote(s)
04 pressing the vote button raises the current value by one
05 feeding in an anecdote content in create anecdote form makes it list in the populated anecdotes rightaway*/

import { render, screen } from '@testing-library/react';
import Anecdote from './Anecdote';
import userEvent from '@testing-library/user-event';

const anecdote = {
	content: 'life is a lemon & i want my money back',
	votes: 7,
	id: '679b45673991d40d2c01571b',
};

test.only('renders content', () => {
	const { container } = render(<Anecdote theAnecdote={anecdote} />);
	const div = container.querySelector('.anecdote');
	expect(div).toHaveTextContent('life is a lemon & i want my money back');
	expect(div).toHaveTextContent('7');
});

test.only('if the like button is clicked twice, respective event handler is called twice', async () => {
	const mockHandlerToVote = vi.fn();
	const { container } = render(<Anecdote theAnecdote={anecdote} voteAction={mockHandlerToVote} />);
	const user = userEvent.setup();
	const votebutton = screen.getByText('vote');
	await user.click(votebutton);
	await user.click(votebutton);
	expect(mockHandlerToVote.mock.calls).toHaveLength(2);
});
