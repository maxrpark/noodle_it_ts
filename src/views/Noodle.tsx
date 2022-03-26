import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import simpleSlider from '@maxcoding/simpleslider';
import styled from 'styled-components';

import { NoodleDetails } from '../Context';
import { useGlobalContext } from '../Context';

// components
import SingleNoodleMain from '../components/SingleNoodleMain';
import Card from '../components/Card';

// variables
const baseUrl = 'https://noodleapi.herokuapp.com/api/v1/noodles/';
const Noodle = () => {
  const { relatedByBrand, relatedByCategory } = useGlobalContext();
  const [noodle, setNoodle] = useState({} as NoodleDetails);
  const { slug } = useParams();

  const getData = async () => {
    const response = await axios(baseUrl + slug);
    const data = response.data;
    if (data) {
      setNoodle(data);
      simpleSlider();
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (noodle.name) {
    return (
      <Wrapper>
        <SingleNoodleMain noodle={noodle} key={noodle.id} />

        <div className='related-noodles'>
          <h2>Recommended By Category</h2>
          {relatedByCategory(noodle).map((noodle: NoodleDetails) => {
            return <Card key={noodle.id} noodle={noodle} />;
          })}

          <h2>Recommended By Brand</h2>
          {relatedByBrand(noodle).map((noodle: NoodleDetails) => {
            return <Card key={noodle.id} noodle={noodle} />;
          })}
        </div>
      </Wrapper>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Noodle;

const Wrapper = styled.div`
  /* single noodle */
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .description {
    text-align: center;
    margin-bottom: 1rem;
  }
  .instructions {
    max-width: 600px;
    margin: 1rem;
  }
  .section-one {
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  .info p {
    margin: 0.5rem 0;
  }
  .info span {
    color: crimson;
    font-weight: bold;
    text-transform: capitalize;
  }
  /* .sliderContainer {
    max-height: 400px;
  }

  .img {
    object-fit: contain !important;
  } */

  //related-noodles
  .related-noodles {
    max-width: 1400px;
    margin: 0 auto;
  }
`;
