import styled from 'styled-components';
import Container from '@material-ui/core/Container'

export const Wrapper = styled(Container)`
	margin: 40px auto 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;

	.search-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%auto;
		height: 180px;
		margin: auto;

		h1 {
			margin-bottom: 20px;
		}
	}

	@media (max-width: 800px) {
		.grid {
			display: flex;
			flex-wrap: wrap;
		}
	}
`;
