import PropTypes from 'prop-types';
import styles from 'components/Button/Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <button className={styles.button} type="submit" onClick={onLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
