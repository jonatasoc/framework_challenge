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
  TodoContent,
  TodoDescription,
  BackIcon,
  TitlePage,
  HeaderPageContainer,
} from './Todos.styles';
import { getTodos } from '../../services/todos';
import { LoadingIcon } from '../../components/Loading/Loading.styles';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dataDisplayed, setDataDisplayed] = useState<Todo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  const animation = useSpring({
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
    delay: 600,
  });

  const TODOS_OFFSET = 10;

  useEffect(() => {
    const fetchTodosData = async () => {
      try {
        const todosData = await getTodos();

        setTodos(todosData);

        setDataDisplayed(todosData.slice(0, TODOS_OFFSET));
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

    fetchTodosData();
  }, []);

  const handleNext = useCallback(async () => {
    if (todos.length === dataDisplayed.length) {
      setHasMore(false);
      return;
    }

    const newPostsData = todos.slice(
      0,
      dataDisplayed.length - 1 + TODOS_OFFSET,
    );

    setDataDisplayed(newPostsData);
  }, [todos, setDataDisplayed, dataDisplayed]);

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
        {dataDisplayed.map(({ id, title }) => (
          <Container elevation={2} key={id}>
            <Title>{title}</Title>
            <TodoContent>
              <TodoDescription>{''}</TodoDescription>
            </TodoContent>
          </Container>
        ))}
      </InfiniteScroll>
      <BackIcon onClick={() => history.push('/')} isEditing>
        <MdArrowBack size={30} />
      </BackIcon>
    </animated.div>
  );
};

export default Todos;
