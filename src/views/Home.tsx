import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import simpleSlider from '@maxcoding/simpleslider';
import simplereview from 'simplereview';

interface Noodle {
  id: number;
  name: string;
  images: string[];
  rating: number;
  slug: string;
}

const baseUrl = 'https://noodleapi.herokuapp.com/api/v1/noodles/';
function Home() {
  const [noodles, setNoodles] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [thing, setThing] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const handleClick = (id: string) => {
    setIsShow(true);
    console.log(id);
  };
  const getData = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    setNoodles(data);
    simpleSlider();
    simplereview();
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    // if (!isTrue) {
    //   simplereview();
    //   setIsTrue(true);
    // }
  }, []);

  return (
    <div className='App'>
      {isShow && <div>hello</div>}
      <button onClick={() => handleClick('hello')}>hello</button>
      <ul>
        {noodles.map((noodle: Noodle) => {
          console.log(noodle);
          return (
            <div key={noodle.id}>
              {/* <div
                className='simpleReview'
                resultValue={noodle.rating}
                id='uno'
              ></div> */}
              <div
                className='simpleReview'
                resultvalue={noodle.rating}
                id='uno'
              ></div>
              <Link to={`/${noodle.slug}`}>read more</Link>
              <h2>{noodle.name}</h2>
              <section className='sliderContainer'>
                {noodle.images.map((image: string) => {
                  return (
                    <div className='slide' key={image}>
                      <img src={image} alt={noodle.name} />;
                    </div>
                  );
                })}
              </section>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
