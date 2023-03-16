import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from 'services/image-api';
import Searchbar from 'components/Searchbar/';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button';
import Loader from 'components/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function addImages() {
      try {
        const { images, totalImages } = await fetchImages(query, page);

        if (!images.length) {
          return toast.info('Sorry, there are no images');
        }

        setImages(prevState => [...prevState, ...images]);
        setTotalImages(totalImages);
      } catch (error) {
        toast.error(setError.message);
      } finally {
        setIsLoading(false);
      }
    }
    addImages(query, page);
  }, [query, page]);

  const getSearchRequest = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotalImages(0);
  };

  const onNextFetch = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const openModal = () => setShowModal(true);

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
          // currentImageUrl={largeImageURL}
          // currentImageDescription={tags}
        />
      )}

      <ToastContainer />
    </>
  );
};
export default App;
