import React, { useEffect, createRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type BoardColumnEditorProps = {
  saveList: () => void;
  onClickOutside: () => void;
  title: any;
  handleChangeTitle: any;
  deleteList?: any;
};

const BoardColumnEditorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BoardColumnEditor: React.FC<BoardColumnEditorProps> = (props) => {
  const ref = createRef();

  const onEnter = (e: { keyCode: number; preventDefault: () => void }) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.saveList();
    }
  };

  const handleClick = (e: { target: any }) => {
    const node = ref.current;

    // @ts-ignore
    if (node && node.contains(e.target)) {
      return;
    }

    props.onClickOutside();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, false);
    return () => document.removeEventListener('click', handleClick, false);
  });

  const { title, handleChangeTitle, deleteList } = props;

  return (
    // @ts-ignore
    <BoardColumnEditorContainer ref={ref}>
      <TextareaAutosize
        autoFocus
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        maxRows={2}
        style={{
          width: deleteList ? 220 : 245,
          margin: '6px 0 5px 6px',
          borderRadius: 3,
          border: 'none',
          resize: 'none',
          outline: 'none',
          fontSize: 15,
          padding: 5
        }}
      />
      {deleteList && (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={deleteList}
          style={{
            cursor: 'pointer',
            padding: 2,
            margin: '1px 3px',
            fontSize: 23,
            borderRadius: 5,
            color: 'rgba(0, 0, 0, 0.5)'
          }}
        />
      )}
    </BoardColumnEditorContainer>
  );
};

export default BoardColumnEditor;
