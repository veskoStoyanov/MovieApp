
import { Link } from 'react-router-dom';
import { Wrapper } from './Hero.style'
import Button from '@material-ui/core/Button';

const Hero = () => {
    return <Wrapper>
        <div className="content">
            <div className="info">
                <h2>Heading</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <Link to="/search">
                <Button className="btn" size="large" color="primary" variant="contained">Search</Button>
            </Link>
        </div>
    </Wrapper>
};

export default Hero;