import { FunctionalComponent, h } from "preact";
import { useState } from "preact/compat";
import PhonicNonsense from "./components/PhonicNonsense";
import Ready from "./components/Ready";
import SelectDifficulty from "./components/SelectDifficulty";
import { Difficulties } from "./models/difficulties";
import { Steps } from "./models/steps";
import "./style.css";

const App: FunctionalComponent = () => {
  const [step, setStep] = useState<Steps>(Steps.Difficulty);
  const [difficulty, setDifficulty] = useState<Difficulties>(Difficulties.Set1);
  let output;
  switch (step) {
    case Steps.Difficulty:
      output = (
        <SelectDifficulty
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setStep={setStep}
        />
      );
      break;
    case Steps.Ready:
      output = <Ready setStep={setStep} />;
      break;
    case Steps.Playing:
      output = <PhonicNonsense difficulty={difficulty} />;
  }

  return <main>{output}</main>;
};

export default App;
