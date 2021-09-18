import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../store/actions'

// Components
import { Wrapper } from './HomeScreen.style';
import { Hero } from '../../components';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';

import { makeRequest } from '../../utility';

const HomeScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [movies, setMovie] = useState([]);

    const { currentUser, token, favoriteMovies } = useSelector((state) => state.userState);
    const { changeFavoriteMovies } = bindActionCreators(userActions, dispatch);

    const initial = async () => {
        try {
            const { data } = await makeRequest(token, 'user/movies');
            changeFavoriteMovies(data)
            setMovie(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            history.push('/search');
            return;
        }

        initial();
    }, [currentUser]);

    return (
        <Wrapper>
            <Hero />
            <h2 className="title">Your Favorite</h2>
            <Container>
                <div className="img-container" >
                    {favoriteMovies?.map(movie => (
                        <div key={movie._id}>
                            <Link to={`/movies/${movie._id}`}>
                                <CardMedia
                                    className="img-item"
                                    component="img"
                                    height="100%"
                                    image={`${movie.image}`}
                                    alt="Paella dish"
                                    key={movie._id}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </Wrapper>
    )
};

export default HomeScreen;