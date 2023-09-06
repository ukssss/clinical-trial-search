import { styled } from 'styled-components';

interface EmphasisTextProps {
  text: string;
  keyword: string;
}

export const emphasisText = ({ text, keyword }: EmphasisTextProps) => {
  if (!text || !keyword) return text;

  const keywordIndex = text.toLowerCase().indexOf(keyword.toLowerCase());
  const beforeKey = text.slice(0, keywordIndex);
  const mainKey = text.slice(keywordIndex, keywordIndex + keyword.length);
  const afterKey = text.slice(keywordIndex + keyword.length);

  return (
    <>
      {beforeKey}
      <StyledStrong>{mainKey}</StyledStrong>
      {afterKey}
    </>
  );
};

const StyledStrong = styled.strong`
  color: #007be9;
  font-weight: bold;
`;
