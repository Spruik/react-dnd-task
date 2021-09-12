import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/app-store';
import { fetchImages } from './services/image-services';
import { useViewport } from './utils/util-functions';
import { createGlobalStyle } from 'styled-components';

// Import main Board component
import Board from './components/board';
// Import Header component
import { Header } from './components/header';

// Use createGlobalStyle to change the background of 'body' element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4bcffa;
    height: 100vh;
    margin: 0;
  }
`;

// Create component for the page
const Page = () => {
  const { width } = useViewport();

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <Board />
      <GlobalStyle />
    </Provider>
  );
};

// Render the page into DOM
ReactDOM.render(<Page />, document.getElementById('root'));
