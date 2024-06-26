import React, { useState } from 'react'; // Import useState from React
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from '../StepThree';

const Home = () => {
  // Step state to track the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Function to go to the next step
  const nextStep = () => {
    setCurrentStep(prevStep => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  // Function to go to the previous step
  const previousStep = () => {
    setCurrentStep(prevStep => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  // Function to render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne nextStep={nextStep} />;
      case 2:
        return <StepTwo nextStep={nextStep} previousStep={previousStep} />;
      case 3:
        return <StepThree previousStep={previousStep} />;
      default:
        return <StepOne nextStep={nextStep} />;
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {renderStep()}
    </div>
  );
};

export default Home;
