import { useDocumentClick } from "../lib/hooks/useDocumentClick";
import { Steps } from "../models/steps";
import { FunctionalComponent, h, Fragment } from "preact";

interface ReadyProps {
  setStep: (step: Steps) => void;
}

const Ready: FunctionalComponent<ReadyProps> = ({ setStep }) => {
  useDocumentClick(() => {
    setStep(Steps.Playing);
  });
  return <h1>Tap to move to the next word</h1>;
};

export default Ready;
