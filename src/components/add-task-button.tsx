import * as React from 'react'
import styled from 'styled-components'

interface AddTaskButtonProps {
  className?: string
  disabled?: boolean
  href?: string
  onAddTask: any
}

const AddTaskButtonWrap = styled.button`
    margin-bottom:10px;
`

export const AddTaskButton: React.FC<AddTaskButtonProps> = props => {
  return <AddTaskButtonWrap onClick={()=>props.onAddTask}>
      Add Task
  </AddTaskButtonWrap>
}
