import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorInfo>404 - 페이지를 찾을 수 없습니다.</ErrorInfo>
      <StyledLink to='/'>홈으로 돌아가기</StyledLink>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  padding: 2rem;
`;
const ErrorInfo = styled.h1`
  margin-bottom: 10px;
`;
const StyledLink = styled(Link)``;

export default ErrorPage;
