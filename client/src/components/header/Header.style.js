import styled from 'styled-components';

export const Wrapper = styled.header`
	border-bottom: 2px solid var(--main-green-color);
	background-color: #f8f8f8;
	.container {		
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		margin: auto;
		padding: 10px;

		.logo {
			display: flex;
			align-items: center;

			h2 {
				color: black;
			}

				button {
					margin-left: 10px;
				}
			}

		div {
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
		}

		@media (max-width: 800px) {
		.search {
			display: none;
		}
	}
	}
`;
