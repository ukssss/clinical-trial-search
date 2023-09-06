import { useState } from 'react';
import { styled } from 'styled-components';

import { SearchBar, SearchResult, Title } from '@/components';
import { useLocalCache } from '@/hooks';

const SearchPage = () => {
  const [diseaseName, setDiseaseName] = useState('');

  const changeDiseaseName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiseaseName(e.target.value);
  };

  const diseaseList = useLocalCache(diseaseName);
  const existsDisease = diseaseList.length > 0 && diseaseName;

  return (
    <StyledContainer>
      <Title />
      <SearchBar
        id='clinical-trial-search-input'
        placeholder='질환명을 입력해 주세요'
        value={diseaseName}
        onChange={changeDiseaseName}
      />
      {existsDisease ? <SearchResult diseaseList={diseaseList} diseaseName={diseaseName} /> : ''}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100vh;
  padding: 50px;
  background-color: #cae9ff;
`;

export default SearchPage;
