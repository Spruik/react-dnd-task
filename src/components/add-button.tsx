import * as React from 'react';

import styled from 'styled-components';

// Define types for board item element properties
type AddButtonProps = {
    onClick: any
}

// Create styles board element properties
const AddButtonEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
export const AddButton: React.FC<AddButtonProps> = (props) => {
    const { onClick } = props;
    return (
        <AddButtonEl>
            <div onClick={onClick}>

                {/* <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="backward"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="currentColor"
                        d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
                    >
                    </path>
                </svg> */}
            </div>
        </AddButtonEl>


    );


    //     <BoardItemEl

    //     >
    //       {props.item.content}
    //     </BoardItemEl>
    //   )}


};