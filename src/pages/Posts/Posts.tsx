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
  PostContent,
  PostDescription,
  BackIcon,
  TitlePage,
  HeaderPageContainer,
} from './Posts.styles';
import { getPosts } from '../../services/posts';
import { LoadingIcon } from '../../components/Loading/Loading.styles';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
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

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [dataDisplayed, setDataDisplayed] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  const animation = useSpring({
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
    delay: 600,
  });

  const POSTS_OFFSET = 10;

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const postsData = await getPosts();

        setPosts(postsData);

        setDataDisplayed(postsData.slice(0, POSTS_OFFSET));
      } catch (err) {
        await Toast.fire({
          icon: 'error',
          title: `<span style="color: white">Erro ao obter posts. Tente novamente<span> `,
          background: '#e83f5b',
          iconColor: 'white',
          timer: 4000,
        });
      }
    };

    fetchPostsData();
  }, []);

  const handleNext = useCallback(async () => {
    if (posts.length === dataDisplayed.length) {
      setHasMore(false);
      return;
    }

    const newPostsData = posts.slice(
      0,
      dataDisplayed.length - 1 + POSTS_OFFSET,
    );

    setDataDisplayed(newPostsData);
  }, [posts, setDataDisplayed, dataDisplayed]);

  return (
    <animated.div style={animation}>
      <HeaderPageContainer>
        <TitlePage>Posts</TitlePage>
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
            <LoadingIcon /> Carregando Posts...
          </div>
        }
      >
        {dataDisplayed.map(({ id, title, body }) => (
          <Container elevation={2} key={id}>
            <Title>{title}</Title>
            <PostContent>
              <PostDescription>{body}</PostDescription>
            </PostContent>
          </Container>
        ))}
      </InfiniteScroll>
      <BackIcon onClick={() => history.push('/')} isEditing>
        <MdArrowBack size={30} />
      </BackIcon>
    </animated.div>
  );
};

export default Posts;
