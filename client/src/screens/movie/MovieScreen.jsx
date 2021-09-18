import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Wrapper } from './MovieScreen.style';


import { makeRequest } from '../../utility';

import { Movie } from '../../components';
import Container from '@material-ui/core/Container';

const MovieScreen = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const initial = async () => {
        try {
            const { data } = await makeRequest(null, `movies/${id}`);
            setMovie(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        initial();
    }, [])

    if (!movie) {
        return (<div>Loading...</div>);
    }

    return (<Wrapper>
        <Container>
            <Movie hide={false} movie={movie} />
        </Container>
    </Wrapper>)
};
export default MovieScreen;