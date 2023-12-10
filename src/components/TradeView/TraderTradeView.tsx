import React from "react";
import StepperWarpper from "../Stepper/stepperWrapper";
import OfferStepOne from "../Stepper/traderStepper/offerStepOne";
import OfferStepTwo from "../Stepper/traderStepper/offerStepTwo";
import OfferStepThree from "../Stepper/traderStepper/offerStepThree";
import OfferStepFour from "../Stepper/traderStepper/offerStepFour";

interface IProps {
  step: number;
}

export default function TraderTradeView({ step }: IProps) {
  const renderStepper = () => {
    switch (step) {
      case 1:
        return <OfferStepTwo />;
      case 2:
        return <OfferStepThree />;
      case 3:
        return <OfferStepThree />;
      case 4:
        return <OfferStepFour />;
      default:
        return <OfferStepOne />;
    }
  };

  return <StepperWarpper>{renderStepper()}</StepperWarpper>;
}
