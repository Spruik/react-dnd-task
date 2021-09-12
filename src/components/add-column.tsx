import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { ADD_LIST } from '../actions/actions';
import styled from 'styled-components';

// Import BoardColumnEditor component
import BoardColumnEditor from './board-column-editor';
// Import EditButtons component
import EditButtons from './edit-button';

type AddColumnProps = {
  dispatch: any;
  toggleAddingList: () => void;
};

const AddColumnContainer = styled.div`
  background: #dfe3e6;
  border-radius: 5px;
  padding: 2px 2px;
`;

class AddColumn extends React.Component<AddColumnProps> {
  state = {
    title: ''
  };

  handleChangeTitle = (e: { target: { value: any } }) => this.setState({ title: e.target.value });

  createList = async () => {
    const { title } = this.state;
    const { dispatch } = this.props;

    this.props.toggleAddingList();

    dispatch({
      type: ADD_LIST,
      payload: { listId: shortid.generate(), listTitle: title }
    });
  };

  render() {
    const { toggleAddingList } = this.props;
    const { title } = this.state;

    return (
      <AddColumnContainer>
        <BoardColumnEditor
          title={title}
          handleChangeTitle={this.handleChangeTitle}
          onClickOutside={toggleAddingList}
          saveList={this.createList}
        />

        <EditButtons handleSave={this.createList} saveLabel={'Add list'} handleCancel={toggleAddingList} />
      </AddColumnContainer>
    );
  }
}

export default connect()(AddColumn);
