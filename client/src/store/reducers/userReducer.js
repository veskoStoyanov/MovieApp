import { CHANGE_USER_STATE, CHANGE_FAVORITE_MOVIES } from '../constants';

const initialState = {
	currentUser: null,
	token: '',
	favoriteMovies: []
};

const changeUserState = (state, payload) => ({
	...state,
	currentUser: payload.user,
	token: payload.token,
});

const changeFavoriteMovies = (state, payload) => ({ ...state, favoriteMovies: payload });

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case CHANGE_USER_STATE:
			return changeUserState(state, payload);

			case CHANGE_FAVORITE_MOVIES:
				return changeFavoriteMovies(state, payload);
				
		default:
			return state;
	}
};

export default userReducer;
