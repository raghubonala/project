import React, { useState, useEffect } from 'react';

const StepOne = ({ nextStep }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        const data = localStorage.getItem("key");
        const parsedData = data ? JSON.parse(data) : {};
        if (parsedData.name) {
            nextStep(); // Move to the next step if name is already present
        }
    }, [nextStep]);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const sendName = () => {
        localStorage.setItem("key", JSON.stringify({ name }));
        nextStep(); // Move to the next step
    };

    return (
        <div>
            <h1>Step One</h1>
            <input value={name} onChange={handleChange} type="text" placeholder='Name' />
            <button onClick={sendName}>Next</button>
        </div>
    );
};

export default StepOne;
