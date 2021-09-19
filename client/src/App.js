import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { userActions } from './store/actions';

// utils
import { getUserFromStorage, makeRequest } from './utility';

import {
	SearchScreen,
	HomeScreen,
	AuthScreen,
	MovieScreen,
	AdminScreen,
} from './screens';

import { Header } from './components';

const NotFound = () => <div>Not Found</div>;

const App = () => {
	const dispatch = useDispatch();
	const { changeUserState, changeFavoriteMovies } = bindActionCreators(
		userActions,
		dispatch
	);

	const { currentUser } = useSelector((state) => state.userState);

	const initial = async () => {
		if (currentUser) {
			return;
		}

		const user = getUserFromStorage();

		if (user) {
			changeUserState(user);

			try {
				const { data } = await makeRequest(user.token, 'user/movies');
				changeFavoriteMovies(data);
			} catch (e) {
				console.log(e);
			}
		}		
	};

	useEffect(() => {
		initial();
	}, []);

	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={HomeScreen} />
				<Route exact path="/search" component={SearchScreen} />
				<Route exact path="/movies/:id" component={MovieScreen} />

				{!currentUser && (
					<Route exact path="/auth/:type" component={AuthScreen} />
				)}

				{currentUser && currentUser.roles.includes('Admin') && (
					<Route path="/admin/movies/:id" component={AdminScreen} />
				)}
				<Route component={NotFound} />
			</Switch>
		</>
	);
};

export default App;
