import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'services/image-api';
import Searchbar from 'components/Searchbar/';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import Loader from 'components/Loader';

class App extends Component {
  state = {
    query: '',
    page: 1,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: [],
    error: null,
    currentImageUrl: [null],
    currentImageDescription: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ isLoading: true });

      fetchImages(query, page)
        .then(({ images, totalImages }) => {
          if (!images.length) {
            toast.info('Sorry, there are no images');
            return;
          }
          return this.setState(prevState => {
            return {
              images: [...prevState.images, ...images],
              totalImages,
            };
          });
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  getSearchRequest = query => {
    this.setState({ query, page: 1, images: [], totalImages: 0 });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = evt => {
    const currentImageUrl = evt.target.dataset.large;
    const currentImageDescription = evt.target.tags;

    if (evt.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const getSearchRequest = this.getSearchRequest;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;

    return (
      <>
        <Searchbar onSubmit={getSearchRequest} />

        {images && <ImageGallery images={images} openModal={openModal} />}

        {isLoading && <Loader />}

        {!isLoading && images.length !== totalImages && (
          <Button onNextFetch={onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}

        <ToastContainer />
      </>
    );
  }
}

export default App;
