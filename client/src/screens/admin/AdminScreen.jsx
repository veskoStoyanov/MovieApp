import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Wrapper } from './AdminScreen.styles';

import { makeRequest } from '../../utility';

const initialState = {
    title: '',
    yearMade: '',
    genres: '',
    image: '',
    description: '',
    span: '',
    url: ''
};

const AdminScreen = () => {
    const { id } = useParams();
    const history = useHistory();
    const { token } = useSelector((state) => state.userState);

    const [movie, setMovie] = useState(initialState);

    const getMovieData = async () => {
        const { data } = await makeRequest(null, `movies/${id}`);
        setMovie({
            title: data.title,
            yearMade: data.yearMade,
            genres: data.genres,
            image: data.image,
            description: data.description,
            span: data.span,
            url: data.url
        });
    };

    const handleChange = (e) => setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleUpdate = async () => {
        try {
            await makeRequest(token, `movies/${id}`, 'PUT', movie);
            history.push('/search');
        } catch (e) {
            console.log(e);
        }
    };

    const handleCreate = async () => {
        try {
            await makeRequest(token, `movies`, 'POST', movie);
            setMovie(initialState);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (id !== 'create') {
            getMovieData();
        }

    }, [id]);

    return (
        <Wrapper>
            <div>
                <div>
                    <FormControl className="form">
                        <InputLabel htmlFor="my-input">Movie Title</InputLabel>
                        <Input name="title" onChange={handleChange} value={movie.title} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Year Made</InputLabel>
                        <Input name="yearMade" onChange={handleChange} value={movie.yearMade} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Genres</InputLabel>
                        <Input name="genres" onChange={handleChange} value={movie.genres} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Description</InputLabel>
                        <Input name="description" onChange={handleChange} value={movie.description} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Span</InputLabel>
                        <Input name="span" onChange={handleChange} value={movie.span} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Image (URL)</InputLabel>
                        <Input name="image" onChange={handleChange} value={movie.image} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">URL</InputLabel>
                        <Input name="url" onChange={handleChange} value={movie.url} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <Button onClick={id !== 'create' ? handleUpdate : handleCreate} color="primary" variant="outlined" className="btn">{id !== 'create' ? 'Update' : 'Create'}</Button>
            </div>
        </Wrapper>
    )
};

export default AdminScreen;