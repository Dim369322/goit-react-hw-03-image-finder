import React, { Component } from 'react';
import { searchingApi } from './API/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Button } from './Button/Button';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from 'components/App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    page: 1,
    images: [],
    searchQuery: '',
    largeImageURL: '',
    isModalOpen: false,
    status: false,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.status === true && this.state.searchQuery !== '') {
      this.searchImages(prevState);
    }
  }

  searchImages = async prevState => {
    try {
      if (this.state.page === 1) {
        const { hits, totalHits } = await searchingApi(
          this.state.searchQuery,
          this.state.page
        );

        this.setState({
          images: [...hits],
          status: false,
          totalImages: totalHits,
        });

        if (totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
        return;
      }
      const { hits } = await searchingApi(
        this.state.searchQuery,
        this.state.page
      );

      this.setState({
        images: [...prevState.images, ...hits],
        status: false,
        totalImages: prevState.totalImages - hits.length,
      });
    } catch (error) {
      toast.error('Something went wrong, please reload the page.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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

    if (query.value.trim() === '') {
      toast.error("You haven't entered anything.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    evt.target.reset();
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      status: true,
    }));

    if (this.state.totalImages <= 0) {
      toast.error(
        "We're sorry, but you've reached the end of search results.",
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
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
    const {
      images,
      status,
      searchQuery,
      isModalOpen,
      largeImageURL,
      totalImages,
    } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status && searchQuery !== '' && (
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
            {status && totalImages > 0 && (
              <div className={styles.spinner}>
                <TailSpin color="#00BFFF" height={80} width={80} />
              </div>
            )}
            <Button onLoadMore={this.loadMore} />
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {isModalOpen && (
          <Modal url={largeImageURL} onCloseModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
