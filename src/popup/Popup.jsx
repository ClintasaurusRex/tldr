import './Popup.scss';
// import config from '../config';
import Summarizer from '../components/Api';
console.log(config);

const Popup = () => {

  return (
    <div className="Popup">

      <h1>Popup</h1>
      <h2>Popups popups</h2>
      <Summarizer />
    </div >
  );
};

export default Popup;
