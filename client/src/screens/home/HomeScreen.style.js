import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%auto;
    height: 100vh;
    text-align: center;

    .title {
        padding: 50px 0;
        font-size: 36px;
    }

    .img-container {
       border: none;
        display: flex;
        flex-wrap: wrap;

        div {
            width: 300px;
            height: 450px;
            padding: 10px;
        } 
    }
`;