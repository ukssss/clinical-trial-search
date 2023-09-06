import { styled } from 'styled-components';

const Title = () => {
  return (
    <StyledTitle>
      <StyledText>국내 모든 임상시험 검색하고</StyledText>
      <StyledText>온라인으로 참여하기</StyledText>
    </StyledTitle>
  );
};

const StyledTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin-bottom: 50px;
`;
const StyledText = styled.span`
  font-size: 35px;
  font-weight: 600;
`;

export default Title;
