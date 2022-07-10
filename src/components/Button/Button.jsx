import styles from 'components/Button/Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <button className={styles.button} type="submit" onClick={onLoadMore}>
      Load more
    </button>
  );
};
