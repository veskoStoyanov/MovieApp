import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 400px;
	height: 40px;
	display: flex;
	align-items: center;

	.btn {
		color: var(--main-green-color);
		border: 1px solid var(--main-green-color);
		height: 100%;
		width: 80px;
	}

	input {
		height: 100%;
		margin-right: 15px;
		border-radius: 5px;
		padding: 0 5px;
		border: 1px solid var(--main-green-color);
		font-size: 18px;
	}
`;
