import { FunctionalComponent, h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/compat";
import { useDocumentClick } from "../lib/hooks/useDocumentClick";
import { buildWordParts } from "../lib/words";
import { Difficulties } from "../models/difficulties";
import { Strings } from "../models/strings";

interface PhonicNonsenseProps {
  difficulty: Difficulties;
}

const PhonicNonsense: FunctionalComponent<PhonicNonsenseProps> = ({
  difficulty,
}) => {
  const hintRef = useRef<HTMLButtonElement>(null);

  const [word, setWord] = useState<Strings>([]);
  useEffect(() => {
    setWord(buildWordParts(difficulty));
  }, []);

  useDocumentClick(() => {
    setWord(buildWordParts(difficulty));
  }, hintRef);

  const [isHinting, setIsHinting] = useState(false);

  const startHinting = () => setIsHinting(true);
  const stopHinting = () => setIsHinting(false);

  return (
    <>
      {isHinting ? (
        <div class="hint-phonics">
          {word.map((phonic) => (
            <span class="phonic">{phonic}</span>
          ))}
        </div>
      ) : (
        <h1>{word.join("")}</h1>
      )}

      <button
        type="button"
        class="pin-bottom"
        ref={hintRef}
        onMouseDown={startHinting}
        onTouchStart={startHinting}
        onMouseUp={stopHinting}
        onMouseLeave={stopHinting}
        onTouchEnd={stopHinting}
        onTouchCancel={stopHinting}
      >
        Hold for hint
      </button>
    </>
  );
};

export default PhonicNonsense;
