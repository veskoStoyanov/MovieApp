import { useState } from 'react';
import { Wrapper } from './Search.style';
import Button from '@material-ui/core/Button';

const Search = ({ setMovies, allMovies }) => {
    const [value, setValue] = useState('');

    const handleSearch = (e) => setValue(e.target.value);

    const handleSubmit = () => setMovies(allMovies.filter(x => x.title.toLowerCase().trim().startsWith(value.toLowerCase().trim())))

    return (<Wrapper>
        <input value={value} onChange={handleSearch} type="text" placeholder="Search by movie title..." />
        <Button onClick={handleSubmit} className="btn" variant="outlined" >Search</Button>
    </Wrapper>)
};

export default Search;