import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';
function ImageGalleryItem({ tags, webformatURL, largeImageURL, openModal }) {
  return (
    <li className={css.item} onClick={openModal}>
      <img src={webformatURL} alt={tags} data-large={largeImageURL} />
    </li>
  );
}
ImageGalleryItem.prototype = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
