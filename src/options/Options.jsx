import useDarkMode from '../helpers/useDarkMode';
import './Options.scss';

const Options = () => {

  const {
    darkMode,
    darkModeChange,
  } = useDarkMode();

  return (
    <div className="options-container">
      <h1 id='tldr-options'>T.L.D.R. Options</h1>
      <div className="options-list">
        <div className="option-item">
          <label htmlFor="darkMode">Enable Dark Mode:</label>
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={darkMode}
            onChange={darkModeChange}
          />
        </div>
        <div className="option-item">
          <label htmlFor="notifications">Enable Notifications:</label>
          <input type="checkbox" id="notifications" name="notifications" />
        </div>
        <div className="option-item">
          <label htmlFor="summaryLength">Summary Length:</label>
          <select id="summaryLength" name="summaryLength">
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="option-item">
          <label htmlFor="language">Preferred Language:</label>
          <select id="language" name="language">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
      {darkMode && <h2 id='darkmode-on'>Dark Mode On</h2>}
    </div>
  );
};

export default Options;