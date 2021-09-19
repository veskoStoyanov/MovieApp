import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 50px;

	h2 {
		padding-bottom: 20px;
		font-size: 30px;
	}

	.stars {
		display: flex;
	}

	textarea {
		border: 1px solid #a9a9a9;
		border-radius: 5px;
		padding: 10;
		margin: 20px 0;
		min-height: 200px;
		width: 700px;
		font-size: 22px;
        padding: 10px;
	}

	@media (max-width: 800px) {
		margin-top: 350px;

		textarea {
			width: 100%;
		}
	}
`;
