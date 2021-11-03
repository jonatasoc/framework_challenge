import styled from 'styled-components';

export const Container = styled.div``;

export const HeroImg = styled.img`
  color: var(--blue);
  width: 100%;
  max-width: 400px;
  padding: 10px;

  position: fixed;
  right: 25vw;
  top: 80px;

  font-size: 30px;
  letter-spacing: 1px;

  margin-bottom: 40px;

  @media (max-width: 700px) {
    display: none;
  }
`;
