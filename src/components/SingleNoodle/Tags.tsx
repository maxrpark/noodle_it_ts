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
      <div className='tags'>
        {tags.map((tag: string) => {
          return (
            <Link to={`/noodles/tags/${tag}`} className='tag' key={tag}>
              #{tag}
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 1rem;
  .tags {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;
export default Tags;
