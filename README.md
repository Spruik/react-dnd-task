# react-dnd-task
This repo contains the source code for a drag-and-drop task board.

![image](Screenshot.png)

## Assessment Tasks:
### 1. Extend the project so that new tasks can be added
### 2. Extend the project so that tasks can be edited and saved
### 3. Extend the project so that columns can be dragged into a different order.

## How to submit your work.
Create a new branch for your work.
Commit you work into this new branch
Submit a Pull Request for you changes.

## Added Features
- Add a new task bar at the top
- Adds to Column 1 by default
- Tasks can be edited and saved by clicking on items
- Tasks can be deleted
- Columns can be reordered

## Stretch goals
- A dropdown so a new task can be added to any column, not just individual column
- A dialogue box to confirm deletion
- Refactor code to reduce prop drilling e.g by adding contexts
- Refactor code to be less bloated (more seperation of concerns)
- Persist new tasks to the data file.


## Added Dependencies
- ## Material UI
Added Material UI as a framework for styling. Useful for input fields and buttons 
- ### With NPM
npm install @mui/material @emotion/react @emotion/styled

### with yarn
yarn add @mui/material @emotion/react @emotion/styled

## Material UI Icons 
npm install @mui/icons-material

## .dotenv
Added SKIP_PREFLIGHT_CHECK=true to force babel to work