import { useEffect, useState } from "react";

const Calculator: React.FC = () => {
  const [screen, setScreen] = useState<string>("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [currentOperator, setCurrentOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState<boolean>(false);

  const updateScreen = (value: string) => setScreen(value);

  const numberClicked = (number: number) => {
    let newScreen = screen;
    if (waitingForSecond) {
      newScreen = number.toString();
      setWaitingForSecond(false);
    } else {
      if (screen === "0") newScreen = number.toString();
      else if (screen.length < 9) newScreen += number.toString();
    }
    updateScreen(newScreen);
  };

  const operatorClicked = (op: string) => {
    if (!waitingForSecond) {
      if (currentOperator !== null) compute();
      setFirstNumber(Number(screen));
      setCurrentOperator(op);
      setWaitingForSecond(true);
    } else {
      setCurrentOperator(op);
    }
    updateScreen("0");
  };

  const compute = () => {
    const secondNumber = Number(screen);
    let result = 0;

    if (currentOperator === "+") result = (firstNumber ?? 0) + secondNumber;
    else if (currentOperator === "-") result = (firstNumber ?? 0) - secondNumber;

    let resStr = String(result);
    if (resStr.length > 9) {
      resStr = Number(result).toPrecision(9);
      if (resStr.length > 9) resStr = resStr.slice(0, 9);
    }
    if (resStr.includes(".")) {
      resStr = resStr.replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
    }

    setScreen(resStr);
    setFirstNumber(Number(resStr));
  };

  const equalClicked = () => {
    if (currentOperator === null || firstNumber === null) return;
    compute();
    setCurrentOperator(null);
    setFirstNumber(null);
    setWaitingForSecond(false);
  };

  const cClicked = () => {
    setScreen("0");
    setFirstNumber(null);
    setCurrentOperator(null);
    setWaitingForSecond(false);
  };

  // รองรับคีย์บอร์ด
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") numberClicked(Number(event.key));
      else if (event.key === "+") operatorClicked("+");
      else if (event.key === "-") operatorClicked("-");
      else if (event.key === "Enter" || event.key === "=") equalClicked();
      else if (event.key === "Escape") cClicked();
      else if (event.key === "Backspace") {
        if (screen.length > 1) setScreen(screen.slice(0, -1));
        else setScreen("0");
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [screen, currentOperator, firstNumber, waitingForSecond]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.calContainer}>
        <div style={styles.calScreen}>{screen}</div>

        <div>
          {["MC", "MR", "M+", "M-"].map((text) => (
            <button key={text} style={{ ...styles.btn, ...styles.green }} disabled>
              {text}
            </button>
          ))}
          <button style={{ ...styles.btn, ...styles.red }} onClick={cClicked}>
            CE
          </button>
        </div>

        <div>
          {[7, 8, 9].map((n) => (
            <button key={n} style={{ ...styles.btn, ...styles.blue }} onClick={() => numberClicked(n)}>
              {n}
            </button>
          ))}
          <button style={{ ...styles.btn, ...styles.green }} disabled>
            /
          </button>
          <button style={{ ...styles.btn, ...styles.green }} disabled>
            SQ
          </button>
        </div>

        <div>
          {[4, 5, 6].map((n) => (
            <button key={n} style={{ ...styles.btn, ...styles.blue }} onClick={() => numberClicked(n)}>
              {n}
            </button>
          ))}
          <button style={{ ...styles.btn, ...styles.green }} disabled>
            ×
          </button>
          <button style={{ ...styles.btn, ...styles.green }} disabled>
            %
          </button>
        </div>

        <div>
          {[1, 2, 3].map((n) => (
            <button key={n} style={{ ...styles.btn, ...styles.blue }} onClick={() => numberClicked(n)}>
              {n}
            </button>
          ))}
          <button style={{ ...styles.btn, ...styles.green }} onClick={() => operatorClicked("-")}>
            −
          </button>
          <button style={{ ...styles.btn, ...styles.green }} disabled>
            1/X
          </button>
        </div>

        <div>
          <button style={{ ...styles.btn, ...styles.blue }} onClick={() => numberClicked(0)}>
            0
          </button>
          <button style={{ ...styles.btn, ...styles.blue }} disabled>
            .
          </button>
          <button style={{ ...styles.btn, ...styles.blue }} disabled>
            +/−
          </button>
          <button style={{ ...styles.btn, ...styles.green }} onClick={() => operatorClicked("+")}>
            +
          </button>
          <button style={{ ...styles.btn, ...styles.green }} onClick={equalClicked}>
            =
          </button>
        </div>
      </div>

      <div style={styles.student}>67159844 ภูริภัทร ทองมวน</div>
    </div>
  );
};

export default Calculator;

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
    textAlign: "center",
  },
  calContainer: {
    margin: "1rem auto",
    width: "fit-content",
    border: "3px solid black",
    padding: "0.5rem",
    borderRadius: "20px",
    backgroundColor: "rgb(240, 240, 240)",
  },
  calScreen: {
    backgroundColor: "rgb(196, 253, 255)",
    border: "2px solid gray",
    borderRadius: "10px",
    textAlign: "right",
    padding: "0.5rem",
    margin: "0.125rem 0.125rem 1rem 0.125rem",
    fontSize: "1.5rem",
    minWidth: "150px",
  },
  btn: {
    width: "2.5rem",
    height: "2.5rem",
    margin: "0.25rem 0.125rem",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  green: { backgroundColor: "lightgreen" },
    blue: { backgroundColor: "lightblue" },
  red: { backgroundColor: "lightcoral" },
  student: { marginTop: "1rem" },
};
