import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

import simpleSlider from '@maxcoding/simpleslider';
import simplereview from 'simplereview';

interface Noodle {
  id: number;
  name: string;
  images: string[];
}

const baseUrl = 'http://127.0.0.1:8000/api/v1/noodles/';
function App() {
  const [noodles, setNoodles] = useState([]);

  const getData = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    setNoodles(data);
    simpleSlider();
  };
  useEffect(() => {
    getData();
    console.log(noodles);
  }, []);
  useEffect(() => {
    simplereview();
  }, []);

  return (
    <div className='App'>
      <div className='simpleReview'></div>
      <h1>Noodles</h1>
      <div className='simpleReview'></div>
      <ul>
        {noodles.map((noodle: Noodle) => {
          console.log(noodle.images);
          return (
            <div key={noodle.id}>
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

export default App;
