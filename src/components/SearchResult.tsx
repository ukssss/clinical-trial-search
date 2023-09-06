import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { css, styled } from 'styled-components';

import { useKeyControl } from '@/hooks';

interface SearchResultProps {
  diseaseList: DiseaseProps[];
  diseaseName: string;
}

interface SearchRecommendListProps {
  selected: boolean;
}

const SearchResult = ({ diseaseList, diseaseName }: SearchResultProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useKeyControl({ setSelectedIndex, diseaseList });

  return (
    <SearchResultContainer>
      {diseaseList.length > 0 && diseaseName ? (
        <SearchWordContainer>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <SearchWord>{diseaseName}</SearchWord>
        </SearchWordContainer>
      ) : (
        ''
      )}

      <SearchRecommendInfo>{diseaseList.length > 0 && diseaseName ? '추천 검색어' : '검색어 없음'}</SearchRecommendInfo>
      <SearchRecommendContainer>
        {diseaseList.length > 0 && diseaseName ? (
          <>
            {diseaseList.map((disease, index) => (
              <SearchRecommendList key={index} selected={selectedIndex === index}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <SearchRecommendWord>{disease.sickNm}</SearchRecommendWord>
              </SearchRecommendList>
            ))}
          </>
        ) : (
          ''
        )}
      </SearchRecommendContainer>
    </SearchResultContainer>
  );
};

const SearchResultContainer = styled.div`
  background-color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 21px;
  padding: 30px 0;
`;

const SearchWordContainer = styled.div`
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 20px;

  & > svg {
    position: absolute;
    left: 20px;
    color: #a6afb7;
  }
`;

const SearchWord = styled.span`
  font-size: 18px;
  font-weight: bold;
  padding: 25px 10px 25px 45px;
`;

const SearchRecommendContainer = styled.ul``;

const SearchRecommendInfo = styled.span`
  padding: 0 10px 0 25px;
  display: block;
  margin-bottom: 10px;
`;

const SearchRecommendWord = styled.span`
  font-size: 18px;
  padding: 25px 10px 25px 45px;
`;

const SearchRecommendList = styled.li<SearchRecommendListProps>`
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  & > svg {
    position: absolute;
    left: 20px;
    color: #a6afb7;
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: #eeeeee;
      border-radius: 8px;
    `}
`;

export default SearchResult;
