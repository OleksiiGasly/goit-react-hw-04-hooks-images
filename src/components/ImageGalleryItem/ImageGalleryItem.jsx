import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  imageTags,
  tags,
  handleSelectedImage,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => handleSelectedImage(largeImageURL, imageTags)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageTags: PropTypes.string,
  tags: PropTypes.string,
  handleSelectedImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
