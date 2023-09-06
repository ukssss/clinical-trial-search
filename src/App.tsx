import '@/App.css';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

function App() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main``;

export default App;
