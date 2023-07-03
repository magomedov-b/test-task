import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cell from "./components/Cell";
import Example from "./components/Example";
import SelectedDate from "./components/Selected-date";
import Months from "./components/Months";

const DATE_URL = 'https://dpg.gg/test/calendar.json';
const App = () => {
    const [contributions, setContributions] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [contributionsCount, setContributionsCount] = useState(0);

    useEffect(() => {
        axios
            .get(DATE_URL)
            .then((res) => {
                setContributions(res.data);
            })
            .catch((error) => {
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
        setSelectedDate({ date, count });
        setContributionsCount(count);
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
                const date = currentDate.toLocaleDateString('ru', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
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
                    <Cell
                        key={`${index}-${i}`}
                        className={cellClassName}
                        count={count}
                        date={date}
                        dataCount={count}
                        onHandleClick={() => handleCellClick(date, count)}
                    />
                );
            }

            return (
                <div key={`week-${index}`} className="week-row">
                    {cells}
                </div>
            );
        });
    };

    const monthsArray = [
        'Июль',
        'Авг.',
        'Сент.',
        'Окт.',
        'Нояб.',
        'Дек.',
        'Янв.',
        'Фев.',
        'Март',
        'Апр.',
        'Май',
        'Июнь'
    ];



    return (
        <div className="container">
            {selectedDate && (
                <SelectedDate selectedDate={selectedDate.date} contributionsCount={selectedDate.count} />
            )}
            <Months
                names={monthsArray}
            />
            <div className="table">
                <div className="weekDays">
                    <span className="weekDays-name">Ср</span>
                    <span className="weekDays-name">Пт</span>
                    <span className="weekDays-name">Пн</span>
                </div>
                <div className="contribution-graph">{renderCells()}</div>
            </div>
            <Example />
        </div>
    );
};

export default App;

