import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
type Props = {
  tags: string[];
};

const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <Wrapper className='tags-container'>
      <h3>Tags: </h3>
      {tags.map((tag: string) => {
        return (
          <Link to={`/noodles/tags/${tag}`} className='tag' key={tag}>
            #{tag}
          </Link>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 1rem;
`;
export default Tags;
