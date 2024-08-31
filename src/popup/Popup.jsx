import './Popup.scss';
// import config from '../config';
import Summarizer from '../components/Api';
import PopupItems from '../components/PopupItems';
import Api from '../components/Api';

const Popup = () => {

  return (
    <div className="Popup">

      {/* <Summarizer /> */}
      <PopupItems />
      {/* <Api /> */}
    </div >
  );
};

export default Popup;
