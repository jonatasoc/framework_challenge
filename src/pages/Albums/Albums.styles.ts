import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 10px;

  margin-bottom: 5px;

  background-color: var(--white);

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const HeaderPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;

export const TitlePage = styled.h1`
  color: var(--text);
  width: 100%;

  font-size: 1.5rem;
  letter-spacing: 1px;
`;

export const Title = styled.p`
  color: var(--text);
  width: 100%;
  margin-bottom: 20px;

  font-size: 1.5rem;
  letter-spacing: 1px;
`;

interface BackIconProps {
  readonly isEditing?: boolean;
}

export const BackIcon = styled.button<BackIconProps>`
  cursor: pointer;
  background: #fff;
  border: none;

  width: ${props => (props.isEditing ? '100%' : 'inherit')};
  align-self: ${props => (props.isEditing ? 'center' : 'inherit')};
`;
