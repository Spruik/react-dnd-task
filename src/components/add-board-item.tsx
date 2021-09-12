import * as React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { BoardColumn } from './board-column'

// some values for BoardColumn calling
// not sure how to use this BoardColumn component
let columnKey = "column-1";
let columnName = "Column 1";
let text = "";

class AddBoardItem extends React.Component{

    state = {
        TextAreaOpen: false
    };

    renderAddItemButton = () => {
        return (
            <button onClick={this.OpenNewCard}>
                <p>+ Add another item</p>
            </button>
        )
    };

    // function that show text area for a new card and buttons
    renderItemTextArea = () => {
        const introText = "Enter texts for this card";
        const buttonText = "Add Card";

        return <div>
            <TextareaAutosize 
                placeholder={introText} 
                autoFocus 
                onBlur={this.CloseNewCard}
                style={{
                    width: "100%",
                    resize: "none",
                }}
            />
            <div>
                <button
                    onMouseDown={this.newCard}>
                    {buttonText}
                </button>
            </div>
        </div>;
    };

    // Need to read texts from textarea when button clicked
    handleChange(e: React.ChangeEventHandler){
        this.setState({
            text: e.toString
        });
        console.log(text);
    }

    // Show textarea for new card
    OpenNewCard = () => {
        this.setState({
            TextAreaOpen: true
        })
    };

    // Close textarea for new card
    CloseNewCard = (e: React.ChangeEvent) => {
        this.setState({
            TextAreaOpen: false
        })
    };

    // Need to add new card to the column
    newCard = (e: any) => {
        //<BoardColumn key={columnKey} column={columnName} items="item-1"/>;
        console.log("Hey");
    }

    render() {
        return this.state.TextAreaOpen ? this.renderItemTextArea() : this.renderAddItemButton();   
    };
}

export default AddBoardItem;