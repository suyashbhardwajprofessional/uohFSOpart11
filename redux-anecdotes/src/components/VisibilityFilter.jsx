import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterAnecdotesWith } from '../reducers/filterReducer';

const VisibilityFilter = () => {
	const dispatch = useDispatch();
	const [filterValue, setFilterValue] = useState('');

	const handleFilter = event => {
		dispatch(filterAnecdotesWith(event.target.value));
	};

	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			<input type="text" name="filterkey" onChange={handleFilter} className="form-control" placeholder="filter" />
		</div>
	);
};

export default VisibilityFilter;
