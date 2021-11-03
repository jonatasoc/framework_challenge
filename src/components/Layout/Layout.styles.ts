import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 800px;
  align-items: flex-start;

  height: max-content;
  width: 100%;

  margin: 0 auto;

  padding: 10px;

  background-color: var(--white);
`;

export const Title = styled.p`
  color: var(--white);
  background: var(--blue);
  height: 80px;
  text-align: center;
  padding-top: 20px;

  font-size: 30px;
  letter-spacing: 1px;

  &:hover {
    cursor: pointer;
  }
`;
