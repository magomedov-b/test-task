import React from 'react';

const SelectedDate = (props) => {
    return (
        <div className="selected-date">
            <div className="count">{props.contributionsCount} contributions</div>
            <div className="date">{props.selectedDate}</div>
        </div>
    );
};

export default SelectedDate;