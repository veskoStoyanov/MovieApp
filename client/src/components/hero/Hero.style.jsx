import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%auto;
	height: 800px;
	background-image: url('https://www.pymnts.com/wp-content/uploads/2020/04/movie-theaters-streaming-services.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	object-fit: cover;
	position: relative;
    
	/* &:before {
        content: '';
        width: 100%auto;
        height: 100%auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity: 0.8;
    } */

	.content {
		position: absolute;
		left: 70px;
		top: 400px;
		height: 200px;
		width: 400px;

        .info {
            color: #fff;
        }

        button {
            margin-top: 20px;
        }
	}

	@media (max-width: 850px) {
		height: 400px;
		.content {
			margin: auto;
			position: relative;
			top: 100px;
			left: auto;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.info {
			display: none;
		}
	}
`;
