import React, { useState, useRef } from 'react'
import { useFocus } from '../utils/useFocus'
import { Grid, Button, TextField, Input, Theme } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components'
import '../styles/styles.css'
import { createStyles } from '@mui/styles';

interface NewItemFormProps {
    // handleAddItem: (e: React.FormEvent) => void;
    handleAddItem: (e: React.FormEvent, newTask: string) => void;
}
const initialValues = {
    text: ""
}

//Material UI styles
const useStyles = makeStyles((theme?: any) => ({
    input: {
        backgroundColor: '#f2f2f2',
        paddingTop: '8px',
        width: '100%',
        marginBottom: '1em'
    },
    form: {
        display: 'flex',
        margin: 'auto',
        width: '100%;',
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center',
        marginBottom: '2em',
        boxShadow: 'inset 0 0 5px rgba(0,0,0,1)'
    },
    button: {
        width: '200px',
        maxWidth: '50%',
        height: '63px',
        right: 0
    },
    centerText: {
        textAlign: "center"
    }
})
)

const NewItemInputWrapper = styled.div`
  width: 100%;
`



const NewItemForm: React.FC<NewItemFormProps> = ({handleAddItem}) => {
    const [newTask, setNewTask] = useState<string>("")

    const classes = useStyles()
    return (
        <NewItemInputWrapper>
            <form className={classes.form} onSubmit={(e) => handleAddItem(e, newTask)}>
                <TextField 
                className={`${classes.input} ${classes.centerText}`} variant="filled"
                onChange={(e) => setNewTask(e.target.value)}
                value={newTask} 
                placeholder="Add a new task" />
                <Button 
                variant="contained" 
                className={classes.button}
                type="submit"
                >
                    Add item
                </Button>
            </form>
        </NewItemInputWrapper>
    )
}

export default NewItemForm;