import React, { Component } from 'react';
import searchingApi from './API/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from 'components/App.module.css';

class App extends Component {
  state = {
    page: 1,
    images: [],
    searchQuery: '',
    largeImageURL: '',
    isModalOpen: false,
    status: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.searchImages(this.state.searchQuery, this.state.page);
    }
  }

  searchImages = async (searchQuery, page) => {
    try {
      const { hits } = await searchingApi(searchQuery, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: false,
      }));
    } catch (error) {
      console.log('error');
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      status: true,
    }));
  };

  handleFormSubmit = evt => {
    evt.preventDefault();

    const { query } = evt.target.elements;
    this.setState({
      page: 1,
      images: [],
      searchQuery: query.value.trim(),
      status: true,
    });
    evt.target.reset();
  };

  openModal = img => {
    this.setState({
      largeImageURL: img,
      isModalOpen: true,
    });
  };

  closeModal = evt => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const images = this.state.images;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.status && images.length === 0 && (
          <div className={styles.spinner}>
            <TailSpin color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {images.length > 0 && (
          <div className={styles.imageGalleryBox}>
            <ImageGallery
              images={this.state.images}
              onOpenModal={this.openModal}
              onLoadMore={this.loadMore}
            />
            {this.state.status && (
              <div className={styles.spinner}>
                <TailSpin color="#00BFFF" height={80} width={80} />
              </div>
            )}
            <Button onLoadMore={this.loadMore} />
          </div>
        )}
        {this.state.isModalOpen && (
          <Modal
            url={this.state.largeImageURL}
            onCloseModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
