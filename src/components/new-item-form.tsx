import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import styled from 'styled-components'
import Select from '@mui/material/Select';


interface NewItemFormProps {
    // handleAddItem: (e: React.FormEvent) => void;
    handleAddItem: (e: React.FormEvent, newTask: string) => void;
}

const NewItemInputWrapper = styled.div`
display: flex;
width: 100%;
form#add-new-item, input#new-task-content {
        text-align: center;
        position: relative;
        width: 100%;
    }
    .MuiFormControl-root.MuiTextField-root {
        text-align: center;
        height: 60px;
        padding: 0;
        height: 60px;
        margin-bottom: 1em;
        width: 80%;
    }

    input#new-task-content {
        width: 100%;
        background-color: #f2f2f2;
        align-items: center;
        height: 48px;
        padding: 6px 0;
    }
    form#add-new-item {
        margin: auto;
        width: 100%
        justify-content: center;
        position: relative;
        align-items: center;
        margin-bottom: 2em;
        box-shadow: inset 0 0 5px rgba(0,0,0,1);
    }
    button {
        width: 20%;
        max-width: 50%;
        height: 60px;
        right: 0;
        flex-grow: 1;
    }
`



const NewItemForm = ( props: NewItemFormProps) => {
    const [newTask, setNewTask] = useState<string>("")

    return (
        <NewItemInputWrapper>
            <form id="add-new-item" onSubmit={(e) => props.handleAddItem(e, newTask)}>
                <TextField
                    id="new-task-content"
                    variant="filled"
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    placeholder="Add a new task" />
                <Button
                    id="add-task-btn"
                    variant="contained"
                    type="submit"
                >
                    Add item
                </Button>
            </form>
        </NewItemInputWrapper>
    )
}

export default NewItemForm;