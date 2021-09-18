import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SearchScreen, HomeScreen, AuthScreen, MovieScreen, AdminScreen } from './screens';

import { Header } from './components';

const NotFound = () => (<div>Not Found</div>)

const App = () => {
	const { currentUser } = useSelector((state) => state.userState);
	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/" component={HomeScreen} />
				<Route exact path="/search" component={SearchScreen} />
				<Route exact path="/movies/:id" component={MovieScreen} />

				{
					!currentUser && <Route exact path="/auth/:type" component={AuthScreen} />
				}

				{
					currentUser && currentUser.roles.includes('Admin') && <Route path="/admin/movies/:id" component={AdminScreen} />
				}
				<Route component={NotFound} />
			</Switch>			
		</>
	);
};

export default App;
