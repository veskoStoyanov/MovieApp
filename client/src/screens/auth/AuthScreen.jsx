
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../store/actions';

// Components
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Wrapper } from './AuthScreen.style'

import { makeCapitalCase, makeRequest } from '../../utility';

const initialState = {
    email: '',
    password: '',
    rePassword: ''
};

const Auth = () => {
    const { type } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setUseState] = useState(initialState);
    const [error, setError] = useState('');

    const { changeUserState } = bindActionCreators(userActions, dispatch);

    const handleChange = (e) => setUseState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const showError = (text) => setError(<FormHelperText style={{ color: 'red' }} id="my-helper-text">{text}</FormHelperText>);

    const handleClick = async () => {
        const email = state.email.trim();
        const password = state.password.trim();
        const rePassword = state.rePassword.trim();

        if (!(email && password)) {
            showError('Should fill in all of the fields!');
            return;
        }

        if (type === 'register' && password !== rePassword) {
            console.log('yesssssssss');

            return;
        }

        if (type === 'register') {
            try {
                await makeRequest(null, 'user/register', 'POST', { email, password });

            } catch (e) {
                console.log(e);
                showError('Something went wrong!')
                return;
            }

            setError(false);
            history.push('/auth/login');
        } else {
            try {
                const { data } = await makeRequest(null, 'user/login', 'POST', { email, password });
                changeUserState(data);
                history.push('/');
            } catch (e) {
                console.log(e);
                showError('Invalid credentials!')
            }
        }
    };

    return (
        <Wrapper>
            <div>
                {error}
                <div>
                    <FormControl className="form">

                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input name="email" onChange={handleChange} value={state.email} id="my-input" aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input name="password" type="password" onChange={handleChange} value={state.password} id="my-input" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                        </FormControl>
                        {
                            type === 'register' && (<FormControl>
                                <InputLabel htmlFor="my-input">re-Password</InputLabel>
                                <Input type="password" name="rePassword" onChange={handleChange} value={state.rePassword} id="my-input" aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                            </FormControl>)
                        }

                    </FormControl>
                </div>
                <Button onClick={handleClick} color="primary" variant="outlined" className="btn">{makeCapitalCase(type)}</Button>
            </div>


        </Wrapper>
    )
};

export default Auth;