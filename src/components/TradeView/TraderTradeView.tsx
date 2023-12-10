import React from "react";
import StepperWarpper from "../Stepper/stepperWrapper";
import OfferStepOne from "../Stepper/traderStepper/offerStepOne";
import OfferStepTwo from "../Stepper/traderStepper/offerStepTwo";
import OfferStepThree from "../Stepper/traderStepper/offerStepThree";
import OfferStepFour from "../Stepper/traderStepper/offerStepFour";
import { IOffer } from "@/interfaces/offer.interface";
interface IProps {
  step: number;
  offerData: IOffer;
}

export default function TraderTradeView({ step, offerData }: IProps) {
  const renderStepper = () => {
    switch (step) {
      case 1:
        return <OfferStepTwo offerData={offerData} />;
      case 2:
        return <OfferStepThree offerData={offerData} />;
      case 3:
        return <OfferStepThree offerData={offerData} />;
      case 4:
        return <OfferStepFour />;
      default:
        return <OfferStepOne />;
    }
  };

  return <StepperWarpper>{renderStepper()}</StepperWarpper>;
}
