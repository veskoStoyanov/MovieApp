import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { makeRequest } from '../../utility';

import { Wrapper } from './MovieScreen.style';
import { Movie, Rating } from '../../components';
import Container from '@material-ui/core/Container';

const MovieScreen = () => {
    const { id } = useParams();
    const { currentUser } = useSelector((state) => state.userState);
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
            { currentUser && (<Rating id={movie._id} />)}
        </Container>
    </Wrapper>)
};
export default MovieScreen;