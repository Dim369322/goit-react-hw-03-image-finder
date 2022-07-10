import styles from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, tags, largeImageURL, onOpenModal }) => {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        className={styles.imageGalleryItemImage}
        src={url}
        alt={tags}
        onClick={() => onOpenModal(largeImageURL)}
      />
    </li>
  );
};
