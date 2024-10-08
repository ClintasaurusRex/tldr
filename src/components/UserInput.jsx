import "./UserInput.scss";
import useFontSize from "../helpers/useFontSize";
import useSound from "../helpers/useSound";

const UserInput = function (props) {
  const { userInput, setUserInput, handleUserInput, loading } = props;
  const { fontSize } = useFontSize();
  const { playSound } = useSound(0.2); 

  return (
    <div>
      <section className="text-area">
        <textarea
          style={{ fontSize: fontSize }}
          id="text-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me to translate or look up the meaning to a word, I'm here to help"
          rows="5"
          cols="50"
        />
        <button
          id="send-prompt"
          style={{ fontSize: fontSize }}
          onClick={() => { handleUserInput(); playSound(); }}
          disabled={loading || !userInput}
        >
          {loading ? "Processing..." : "Send Prompt"}
        </button>
      </section>
    </div>
  );
};

export default UserInput;
