import React from "react";
import StepperWarpper from "../Stepper/stepperWrapper";
import TradeyStepOne from "../Stepper/offerStepper/tradyStepOne";
import TradeyStepTwo from "../Stepper/offerStepper/tradyStepTwo";
import TradyStepThree from "../Stepper/offerStepper/tradyStepThree";

interface IProps {
  step: number;
}

export default function TradeeTradeView({ step }: IProps) {
  const renderStepper = () => {
    switch (step) {
      case 2:
        return <TradeyStepTwo />;
      case 3:
        return <TradyStepThree />;
      default:
        return <TradeyStepOne />;
    }
  };

  return <StepperWarpper>{renderStepper()}</StepperWarpper>;
}
