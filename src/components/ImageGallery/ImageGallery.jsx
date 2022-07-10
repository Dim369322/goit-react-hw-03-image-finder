import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import styles from 'components/ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};
