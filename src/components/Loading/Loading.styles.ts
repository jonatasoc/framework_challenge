import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  animation: lds-dual-ring 1.2s linear infinite;

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
