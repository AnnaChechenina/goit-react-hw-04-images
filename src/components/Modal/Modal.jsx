import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, currentImageUrl, currentImageDescription } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.handleClickOverlay}>
        <div className={css.modal}>
          <div className={css.wrapper}>
            <button className={css.button} type="button" onClick={onClose}>
              <BsXLg className={css.icon} />
            </button>
          </div>
          <img
            src={currentImageUrl}
            alt={currentImageDescription}
            loading="lazy"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string.isRequired,
  currentImageDescription: PropTypes.string,
};
export default Modal;
