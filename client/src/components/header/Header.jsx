import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../store/actions';

import { removeUserFromStorage } from '../../utility';

// Components
import { Wrapper } from './Header.style';
import Button from '@material-ui/core/Button';
import { Search } from '..';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { changeUserState } = bindActionCreators(userActions, dispatch);
    const { currentUser } = useSelector((state) => state.userState);

    const handleLogout = () => {
        changeUserState({ user: null, token: '' });
        removeUserFromStorage();
        history.push('/');
    };

        return (
            <Wrapper>
                <div className="container">
                    <div className="logo">
                        <Link to="/"><h2>Movie Collection</h2></Link>
                        {
                            !currentUser ? (
                                <>
                                    <Link to="/auth/register">
                                        <Button size="small" color="primary" variant="outlined">Register</Button>
                                    </Link>
                                    <Link to="/auth/login">
                                        <Button size="small" color="primary" variant="outlined">Login</Button>
                                    </Link>
                                </>

                            ) : (<Button onClick={handleLogout} size="small" color="primary" variant="outlined">Logout</Button>)
                        }
                    </div>
                    <div className="search">
                        {currentUser && currentUser.roles.includes('Admin') ? <Link to="/admin/movies/create"><Button size="small" color="primary" variant="outlined">Create Movie</Button></Link> : (<Search />)}
                    </div>
                </div>
            </Wrapper>
        );
    };

    export default Header;
