import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import { GlobalStyle } from './styles/GlobalStyles';
import store from './store';

// remove react string because of material Ui has some troubles
render(
	<Router>
		<Provider store={store}>
			<GlobalStyle />
			<App />
		</Provider>
	</Router>,
	document.getElementById('root')
);
