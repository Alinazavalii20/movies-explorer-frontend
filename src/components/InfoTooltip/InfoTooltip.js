import './InfoTooltip.css';

const InfoTooltip = ({ text, isOpen, onClose }) => {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={e => {
        e.stopPropagation();
      }}>
        <p className="popup__text">{text}</p>
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </section>
  );
};

export default InfoTooltip;