import React, { useState, useEffect } from 'react';
import axios from "axios";

const DATE_URL = 'https://dpg.gg/test/calendar.json'
const App = () => {
    const [contributions, setContributions] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [contributionsCount, setContributionsCount] = useState(0)
    useEffect(() => {
        axios.get(DATE_URL).then((res) => {
            setContributions(res.data)
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const getWeeksArray = () => {
        const currentDate = new Date();
        const weeksArray = [];

        for (let i = 0; i < 51; i++) {
            const weekStart = new Date(currentDate);
            weekStart.setDate(weekStart.getDate() - i * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() - 6);
            weeksArray.unshift([weekStart, weekEnd]);
        }

        return weeksArray;
    };

    const handleCellClick = (date, count) => {
        setSelectedDate(date);
        setContributionsCount(count)
    };

    const renderCells = () => {
        const weeksArray = getWeeksArray();

        return weeksArray.map((week, index) => {
            const [weekStart, weekEnd] = week;
            const cells = [];

            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(weekEnd);
                currentDate.setDate(currentDate.getDate() + i);
                const year = currentDate.getFullYear();
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const day = currentDate.getDate().toString().padStart(2, '0');
                const dateKey = `${year}-${month}-${day}`;
                const count = contributions[dateKey] || 0;
                const date = currentDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    weekday: 'short',
                    year: 'numeric'
                });
                let cellClassName = '';

                if (count === 0) {
                    cellClassName = 'cell';
                } else if (count >= 1 && count <= 9) {
                    cellClassName = 'cell cell-1';
                } else if (count >= 10 && count <= 19) {
                    cellClassName = 'cell cell-2';
                } else if (count >= 20 && count <= 29) {
                    cellClassName = 'cell cell-3';
                } else {
                    cellClassName = 'cell cell-4';
                }

                cells.push(
                    <div
                        key={`${index}-${i}`}
                        className={cellClassName}
                        data-count={count}
                        onClick={() => handleCellClick(date, count)}
                    >
                    </div>
                );
            }

            return cells;
        });
    };

    return (
        <div className="contribution-graph">
            {renderCells()}
            {selectedDate && (
                <div className="selected-date">
                    <div className="date">{selectedDate}</div>
                    <div className="count">{contributionsCount}</div>
                </div>
            )}
        </div>
    );
};

export default App;