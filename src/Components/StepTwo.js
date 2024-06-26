import React, { useState, useEffect } from 'react';

const StepTwo = ({ nextStep, previousStep }) => {
    const [age, setAge] = useState("");

    useEffect(() => {
        const data = localStorage.getItem("key");
        const parsedData = data ? JSON.parse(data) : {};
        if (parsedData.age) {
            nextStep(); // Move to the next step if age is already present
        }
    }, [nextStep]);

    const sendData = () => {
       if (!age) {
        alert("not age")
       }else{
        const existingData = localStorage.getItem("key");
        const parsedData = existingData ? JSON.parse(existingData) : {};
        const updatedData = { ...parsedData, age };
        localStorage.setItem("key", JSON.stringify(updatedData));
        nextStep(); // Move to the next step
       }
    };

    return (
        <div>
            <h1>Step Two</h1>
            <input 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                type="number" 
                placeholder='Age' 
            />
            <button onClick={previousStep}>Previous</button>
            <button onClick={sendData}>Next</button>
        </div>
    );
};

export default StepTwo;
