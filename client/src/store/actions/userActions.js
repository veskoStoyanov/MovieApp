import { CHANGE_USER_STATE, CHANGE_FAVORITE_MOVIES } from '../constants';

export const changeUserState = (userData) => (dispatch) =>
	dispatch({
		type: CHANGE_USER_STATE,
		payload: userData,
	});

export const changeFavoriteMovies = (movies) => (dispatch) =>
	dispatch({
		type: CHANGE_FAVORITE_MOVIES,
		payload: movies,
	});
