import { useState } from "react";
import { useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";

import { Wrapper } from './Rating.style';

import { makeRequest } from '../../utility';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

const Rating = ({ id }) => {
    const { token, currentUser } = useSelector((state) => state.userState);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(null);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const stars = Array(5).fill(0)

    const handleClick = async (value) => {
        try {
            await makeRequest(token, `movies/${id}/rating`, 'PUT', {
                stars: value,
                comment,
                email: currentUser.email
            });

            setMessage('Your rating was sent!')
        } catch (e) {
            console.log(e);
        }

        setCurrentValue(value);
    }

    const handleComment = (e) => setComment(e.target.value);

    const handleMouseOver = (newHoverValue) => setHoverValue(newHoverValue);

    const handleMouseLeave = () => setHoverValue(null);

    return (
        <Wrapper>
            <h2>Your Review</h2>
            <textarea
                onChange={handleComment}
                placeholder="Please first write your comment and after that choose rating."
            />

            <div className="stars">
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={30}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                        />
                    )
                })}
            </div>
            
            {message && (<p>{message}</p>)}
        </Wrapper>
    );
};

export default Rating;
