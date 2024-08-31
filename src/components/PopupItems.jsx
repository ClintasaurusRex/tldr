
const PopupItems = function () {

  return (
    <div class="container">
      <div class="header">
        <h1>T.L.D.R.</h1>
      </div>
      <main class="main-content">
        <section class="summary-container" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p id="summary-text">The other difference between them is that objects have property names so those have to be used in the destructuring part. Since array values are numerically ordered and without names, the order that we destructure is tied to what value we get -- in other words, first is the first variable in the destructure so it gets the first value of the array..</p>
        </section>
        <section class="buttons">
          <button id="rewrite-btn">Re-Write</button>
          <button id="summarize-btn" >Summary</button>
          <button id="copy-btn">Copy</button>
        </section>
        <section class="text-area">
          <textarea id="text-input" placeholder="Text Area" aria-label="Text Area"></textarea>
        </section>
      </main>
      <div class="footer">
        <a href="#">Options</a>
        <a href="#">About</a>
        <a href="#">Donate</a>
      </div>
    </div>
  );
};

export default PopupItems;