import React from 'react';
import Month from "./Month";

const Months = (props) => {
    return (
        <div className="Months">
            {props.names.map((name,index) => (
                <Month
                    key={index}
                    name={name}
                />
            ))}
        </div>
    );
};

export default Months;