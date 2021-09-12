import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

// Import EditButtons component
import EditButtons from './edit-button';

type BoardItemEditorProps = {
  text?: any;
  onSave: (arg0: any) => void;
  onCancel: any;
  onDelete?: any;
  adding?: any;
};

const BoardItemEditors = styled.div`
  min-height: 50px;
  position: relative;
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  font-size: 15px;
  overflow-wrap: break-word;
  background-color: #fff;
`;

class BoardItemEditor extends React.Component<BoardItemEditorProps> {
  state = {
    text: this.props.text || ''
  };

  handleChangeText = (event: { target: { value: any } }) => this.setState({ text: event.target.value });

  onEnter = (e: { keyCode: number; preventDefault: () => void }) => {
    const { text } = this.state;

    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(text);
    }
  };

  render() {
    const { text } = this.state;
    const { onSave, onCancel, onDelete, adding } = this.props;

    return (
      <>
        <BoardItemEditors>
          <TextareaAutosize
            autoFocus
            placeholder="Enter the text for this card..."
            value={text}
            onChange={this.handleChangeText}
            onKeyDown={this.onEnter}
            maxRows={4}
            style={{
              width: '100%',
              border: 'none',
              resize: 'none',
              outline: 'none',
              fontSize: 15
            }}
          />
        </BoardItemEditors>
        <EditButtons
          handleSave={() => onSave(text)}
          saveLabel={adding ? 'Add card' : 'Save'}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </>
    );
  }
}

export default BoardItemEditor;
