/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSpring, animated } from 'react-spring';

import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  Container,
  Title,
  BackIcon,
  TitlePage,
  HeaderPageContainer,
} from './Albums.styles';
import { getAlbums } from '../../services/albums';
import { LoadingIcon } from '../../components/Loading/Loading.styles';

interface Album {
  userId: number;
  id: number;
  title: string;
}

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
});

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [dataDisplayed, setDataDisplayed] = useState<Album[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  const animation = useSpring({
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
    delay: 600,
  });

  const ALBUMS_OFFSET = 15;

  useEffect(() => {
    const fetchAlbumsData = async () => {
      try {
        const albumsData = await getAlbums();

        setAlbums(albumsData);

        setDataDisplayed(albumsData.slice(0, ALBUMS_OFFSET));
      } catch (err) {
        await Toast.fire({
          icon: 'error',
          title: `<span style="color: white">Erro ao obter álbuns. Tente novamente<span> `,
          background: '#e83f5b',
          iconColor: 'white',
          timer: 4000,
        });
      }
    };

    fetchAlbumsData();
  }, []);

  const handleNext = useCallback(async () => {
    if (albums.length === dataDisplayed.length) {
      setHasMore(false);
      return;
    }

    const newAlbumsData = albums.slice(
      0,
      dataDisplayed.length - 1 + ALBUMS_OFFSET,
    );

    setDataDisplayed(newAlbumsData);
  }, [albums, setDataDisplayed, dataDisplayed]);

  return (
    <animated.div style={animation}>
      <HeaderPageContainer>
        <TitlePage>Álbuns</TitlePage>
        <BackIcon onClick={() => history.push('/')}>
          <MdArrowBack size={30} />
        </BackIcon>
      </HeaderPageContainer>
      <InfiniteScroll
        dataLength={dataDisplayed.length}
        next={handleNext}
        hasMore={hasMore}
        loader={
          <div>
            <LoadingIcon /> Carregando Álbuns...
          </div>
        }
      >
        {dataDisplayed.map(({ id, title }) => (
          <Container elevation={2} key={id}>
            <Title>{title}</Title>
          </Container>
        ))}
      </InfiniteScroll>
      <BackIcon onClick={() => history.push('/')} isEditing>
        <MdArrowBack size={30} />
      </BackIcon>
    </animated.div>
  );
};

export default Albums;
