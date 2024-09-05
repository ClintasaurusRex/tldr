
const ResponseApi = function (props) {
  const { responseText } = props;

  return (
    <div className="response-text">
      <h2>Response</h2>
      <p>{responseText}</p>
    </div>
  );
};

export default ResponseApi;