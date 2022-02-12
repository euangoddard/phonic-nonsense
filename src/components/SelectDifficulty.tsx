import { FunctionalComponent, h } from "preact";
import { Steps } from "../models/steps";
import { Difficulties } from "../models/difficulties";

interface DifficultyOption {
  value: Difficulties;
  label: string;
}

const difficultyOptions: readonly DifficultyOption[] = [
  {
    value: Difficulties.Set1,
    label: "Set 1 phonics",
  },
  {
    value: Difficulties.Set2,
    label: "Set 2 phonics",
  },
  {
    value: Difficulties.Set3,
    label: "Set 3 phonics",
  },
];

export interface SelectDifficultyProps {
  difficulty: Difficulties;
  setDifficulty: (difficulty: Difficulties) => void;
  setStep: (step: Steps) => void;
}

const SelectDifficulty: FunctionalComponent<SelectDifficultyProps> = ({
  difficulty,
  setDifficulty,
  setStep,
}) => {
  const onChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value as Difficulties;
    setDifficulty(value);
  };

  return (
    <div>
      <h2>Select difficulty</h2>
      <select value={difficulty} onChange={onChange}>
        {difficultyOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        class="pin-bottom"
        type="button"
        onClick={() => setStep(Steps.Ready)}
      >
        Ready!
      </button>
    </div>
  );
};

export default SelectDifficulty;
