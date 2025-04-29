import { render, screen } from '@testing-library/react';
import Anecdote from './Anecdote';
import userEvent from '@testing-library/user-event';

const anecdote = {
	content: 'life is a lemon & i want my money back',
	votes: 7,
	id: '679b45673991d40d2c01571b',
};

test('renders content', () => {
	const { container } = render(<Anecdote theAnecdote={anecdote} />);
	const div = container.querySelector('.anecdote');
	expect(div).toHaveTextContent('life is a lemon & i want my money back');
	expect(div).toHaveTextContent('7');
});

test('if the like button is clicked twice, respective event handler is called twice', async () => {
	const mockHandlerToVote = vi.fn();
	const { container } = render(<Anecdote theAnecdote={anecdote} voteAction={mockHandlerToVote} />);
	const user = userEvent.setup();
	const votebutton = screen.getByText('vote');
	await user.click(votebutton);
	await user.click(votebutton);
	expect(mockHandlerToVote.mock.calls).toHaveLength(2);
});
