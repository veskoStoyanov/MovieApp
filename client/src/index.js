import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import App from './App';

import { GlobalStyle } from './styles/GlobalStyles';
import store from './store';

const client = new QueryClient();

// remove react string because of material Ui has some troubles
render(
	<Router>
		<Provider store={store}>
			<QueryClientProvider client={client}>
				<GlobalStyle />
				<App />
			</QueryClientProvider>
		</Provider>
	</Router>,
	document.getElementById('root')
);
