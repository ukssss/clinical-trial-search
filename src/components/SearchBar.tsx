import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';

import { SearchButton } from '.';

interface SearchBarProps {
  id: string;
  placeholder?: string;
  value?: string;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ id, placeholder, value, onFocus, onClick, onChange }: SearchBarProps) => {
  return (
    <SearchBarContainer onFocus={onFocus} onClick={onClick}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <Input type='text' id={id} placeholder={placeholder} onChange={onChange} value={value} />
      <SearchButton />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 10px;

  & > svg {
    position: absolute;
    left: 20px;
    color: #a6afb7;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 18px;

  border-radius: 42px;
  border: 2px solid #ffffff;
  padding: 25px 10px 25px 45px;

  &::placeholder {
    color: #a6afb7;
  }
`;

export default SearchBar;
