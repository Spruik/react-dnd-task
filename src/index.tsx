import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'

// Import main Board component
import { Board } from './components/board'
import { NewItemForm } from './components/new-item-form'

// Use createGlobalStyle to change the background of 'body' element
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4bcffa;
  }
`

// Create component for the page
const Page = () => (<>
  <Board />
  <GlobalStyle />
</>)

// Render the page into DOM
ReactDOM.render(<Page />, document.getElementById('root'))

