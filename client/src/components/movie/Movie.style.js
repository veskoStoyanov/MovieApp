import styled from 'styled-components/macro';

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	width: 100%;
	height: 350px;
	padding: 10px;

	.img-container {
		width: 250px;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.info {
        display: flex;
        flex-direction: column;

		flex: 3;
		padding: 20px 40px 0 40px;
		height: 100%;

        button {
            color: var(--main-green-color);
            border: 1px solid var(--main-green-color);
            width: 200px;
            height: 50px;
        }

		.movie-item {
			padding-bottom: 10px;
		}
	}

	@media (max-width: 800px) {
		.info {
			display: ${(props) => props.hide ? 'none' : 'flex'};
		}

		flex-direction: ${(props) => props.hide ? 'row' : 'column'};

		.img-container {
			width: ${(props) => props.hide ? '250px' : '100%'};
		}
	}
`;
