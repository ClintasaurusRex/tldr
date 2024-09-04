import './UserInput.scss';

const UserInput = function (props) {
  const {
    userInput,
    setUserInput,
    handleUserInput,
    loading
  } = props;

  return (
    <div>
      <section className='text-area'>
        <textarea
          id="text-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Don't forget to hit that donate button"
          rows="5"
          cols="50"
        />
        <button id="send-prompt" onClick={handleUserInput} disabled={loading || !userInput}>
          {loading ? 'Processing...' : 'Send Prompt'}
        </button>
      </section>
    </div>
  );
};

export default UserInput;