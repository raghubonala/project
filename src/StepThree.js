import React, { useState, useEffect } from 'react';

const StepThree = ({ previousStep }) => {
    const [qualification, setQualification] = useState("");

    useEffect(() => {
        const data = localStorage.getItem("key");
        const parsedData = data ? JSON.parse(data) : {};
        if (parsedData.qualification) {
            console.log("Qualification already present:", parsedData.qualification);
        }
    }, []);

    const sendData = () => {
        const existingData = localStorage.getItem("key");
        const parsedData = existingData ? JSON.parse(existingData) : {};
        const updatedData = { ...parsedData, qualification };
        localStorage.setItem("key", JSON.stringify(updatedData));
        console.log("Data saved and form submitted:", updatedData);
        // You might want to add logic to handle form submission
    };

    return (
        <div>
            <h1>Step Three</h1>
            <input 
                value={qualification} 
                onChange={(e) => setQualification(e.target.value)}  
                type="text" 
                placeholder='Qualification' 
            />
            <button onClick={previousStep}>Previous</button>
            <button onClick={sendData}>Submit</button>
        </div>
    );
};

export default StepThree;
