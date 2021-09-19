import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../store/actions';

import { Wrapper } from "./Movie.style";
import Button from '@material-ui/core/Button'

import { makeRequest } from '../../utility';

const Movie = ({ setMovies, movie, hide }) => {
    const dispatch = useDispatch();

    const { changeFavoriteMovies } = bindActionCreators(userActions, dispatch);
    const { currentUser, token, favoriteMovies } = useSelector((state) => state.userState);

    const shouldShowUnlikeButton = currentUser &&  favoriteMovies.find(x => x._id.toString() === movie._id.toString());

    const addToFavorite = async () => {
        try {
            await makeRequest(token, `user/movies/${movie._id}/like`, 'POST');
            const movies = [...favoriteMovies, movie];
            changeFavoriteMovies(movies);
        } catch (e) {
            console.log(e);
        }
    }

    const removeFromFavorite = async () => {
        try {
            await makeRequest(token, `user/movies/${movie._id}/unlike`, 'POST');
            const movies = favoriteMovies.filter(x => x._id.toString() !== movie._id.toString());
            changeFavoriteMovies(movies);
        } catch (e) {
            console.log(e);
        }
    }

    const deleteMovie = async () => {
        try {
            await makeRequest(token, `movies/${movie._id}`, 'DELETE');
            const movies = favoriteMovies.filter(x => x._id !== movie._id);
            changeFavoriteMovies(movies);
            setMovies((prev) => prev.filter(x => x._id.toString() !== movie._id.toString()));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Wrapper hide={hide}>
            <div className="img-container">
                {
                    hide ? (
                        <>
                            <Link to={hide ? `/movies/${movie._id}` : ''}>
                                <img src={movie.image} alt={movie.title} />
                            </Link>
                        </>
                    ) : (<img src={movie.image} alt={movie.title} />)
                }
            </div>
            <div className="info">
                <h2 className="movie-item">{movie.title} ({movie.yearMade})</h2>
                <p className="movie-item">{movie.genres} | {movie.span} minutes</p>
                <p className="movie-item">{movie.description}</p>
                <a className="movie-item" href={`${movie.url}`}>Visit official site</a>

                {
                    !currentUser ? null : shouldShowUnlikeButton
                        ? (<Button className="movie-item" style={{
                            color: 'red',
                            border: '1px solid red'
                        }} size="large" variant="outlined" onClick={removeFromFavorite} >Remove From Favorites</Button>)
                        : (<Button className="movie-item" variant="outlined" onClick={addToFavorite} >Add To Favorites</Button>)
                }

                {
                    currentUser && currentUser.roles.includes('Admin') && (
                        <>
                            <Button style={{
                                color: 'red',
                                border: '1px solid red'
                            }} className="movie-item" variant="outlined" onClick={deleteMovie} >Remove</Button>
                            <Link to={`/admin/movies/${movie._id}`}><Button style={{
                                color: 'red',
                                border: '1px solid red'
                            }} className="movie-item" variant="outlined">Update</Button></Link>
                        </>
                    )
                }

            </div>
        </Wrapper>


    )
};

export default Movie;
