import React from 'react';

const Cell = (props) => {
    return (
        <div
            className={props.className}
            data-count={props.dataCount}
            onClick={() => props.onHandleClick(props.date, props.count)}
        >
        </div>
    );
};

export default Cell;