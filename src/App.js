import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetchImages from './utils/api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './App.css';

const App = () => {
  const [imageTags, setImageTags] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const handleFormSubmit = imageTags => {
    setPage(1);
    setGallery([]);
    setImageTags(imageTags);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectedImage = (largeImageURL, imageTags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    async function getGallery() {
      try {
        if (imageTags === '') return;
        setRequestStatus('pending');
        const galleryList = await fetchImages(imageTags, page);
        setGallery(prevState => [...prevState, ...galleryList]);
        setRequestStatus('resolved');
        handleScroll();
        if (galleryList.length === 0) {
          return toast(
            'Sorry, there are no images matching your search query. Please try again.',
          );
        }
      } catch (error) {
        setRequestStatus('rejected');
        console.log(error);
      }
    }
    getGallery();
  }, [imageTags, page]);

  const isLoading = requestStatus === 'pending';
  const showGallery = gallery.length > 0 && !isLoading;

  return (
    <div>
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} alt={tags} />
      )}
      <Searchbar onSearch={handleFormSubmit} />
      {isLoading && (
        <Loader
          type="Puff"
          color="#eb8634"
          height={84}
          width={84}
          style={{
            marginLeft: '666px',
            marginTop: '20px',
            marginBottom: '20px',
          }}
          timeout={2000}
        />
      )}
      <ImageGallery
        gallery={gallery}
        handleSelectedImage={handleSelectedImage}
      />
      {showGallery && <Button handleLoadMore={handleLoadMore} />}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
