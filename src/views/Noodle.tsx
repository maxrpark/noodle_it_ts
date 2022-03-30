import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';
import { useGlobalContext } from '../Context';
import styled from 'styled-components';

import axios from 'axios';
import simpleSlider from '@maxcoding/simpleslider';
import { NoodleDetails } from '../Context';

// components
import { SingleNoodleMain, Card } from '../components';

// variables
const all_noodles = 'https://noodles-api.herokuapp.com/api/v1/noodles/';
const baseUrl = 'https://noodles-api.herokuapp.com/api/v1/noodles/';
const Noodle = () => {
  const { user, getUserDetails } = useGlobalContext();
  const [noodle, setNoodle] = useState({} as NoodleDetails);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { noodles } = useFetch(all_noodles);
  const { slug } = useParams();

  const relatedByBrand = (noodle: NoodleDetails) =>
    noodles
      .filter((item: NoodleDetails) => item.brand.name === noodle.brand.name)
      .slice(0, 3);
  const relatedByCategory = (noodle: NoodleDetails) =>
    noodles
      .filter((item: NoodleDetails) => item.category === noodle.category)
      .slice(0, 3);

  const getData = async () => {
    try {
      const response = await axios(baseUrl + slug);
      const data = response.data;
      if (data) {
        setNoodle(data);
        simpleSlider();
      }
    } catch (error: any) {
      // trow error
      setError(error.response.data.message);
      throw new Error(error);
    }
  };

  const isUserFavoriteNoodle = () => {
    if (user && user.favorites) {
      const userFavorites = user.favorites;
      setIsFavorite((isFavorite) => {
        return (isFavorite =
          userFavorites.filter((fav: any) => fav.slug === noodle.slug).length >
          0);
      });
    }
  };

  const addToFav = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/api/user/user-favorites/${user?.user_name}/${noodle.slug}/`,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFTOKEN',
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          getUserDetails();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user !== null) {
      isUserFavoriteNoodle();
    }
  }, [noodle]);

  useEffect(() => {
    getData();
  }, [slug]);

  if (error !== '') {
    return <h1>{error}</h1>;
  } else if (!noodle.name) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        <div>{user?.user_name ? user.user_name : ''}</div>
        <button onClick={addToFav}>
          {isFavorite ? `Is favorite` : `Add to favorites`}
        </button>
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

  //related-noodles
  .related-noodles {
    max-width: 1400px;
    margin: 0 auto;
  }
`;
