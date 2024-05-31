import React, { useState } from 'react';

const Players = ({ name, symbol, isActive , onChangename }) => {
    const [newName, setNewName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    function handleChange(event) {
        setNewName(event.target.value);
    }

    function handleEditClick() {
        setIsEditing(editing => !editing);
        if(isEditing) {
        onChangename(Symbol,newName);
        }
    }

    let playerNameElement = (
        <span className="player-name">{newName}</span>
    );

    if (isEditing) {
        playerNameElement = (
            <input type="text" value={newName} onChange={handleChange} />
        );
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerNameElement}
                <span className="Player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    );
};

export default Players;
