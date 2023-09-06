import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';

const SearchButton = () => {
  return (
    <SearchButtonContainer>
      <Button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </SearchButtonContainer>
  );
};

const SearchButtonContainer = styled.div`
  position: absolute;
  right: 15px;
`;
const Button = styled.button`
  width: 48px;
  height: 48px;
  background-color: #007be9;
  border: none;
  border-radius: 50%;

  & > svg {
    color: #ffffff;
    font-size: 18px;
  }
`;

export default SearchButton;
