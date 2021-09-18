import { Container, createMuiTheme } from '@material-ui/core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'


// Import main Board component
import { Board } from './components/board'

// Use createGlobalStyle to change the background of 'body' element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #333333;
    font-family: 'Source Sans Pro', sans-serif;
  }
`


// Create component for the page
const Page = () => (<>
  <Container>
    <Board />
    <GlobalStyle />
  </Container>
</>)

// Render the page into DOM
ReactDOM.render(<Page />, document.getElementById('root'))

