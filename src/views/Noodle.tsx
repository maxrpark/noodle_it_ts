import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://noodleapi.herokuapp.com/api/v1/noodles/';

const Noodle = () => {
  const [noodle, setNoodle] = useState({});
  const { slug } = useParams();
  const getData = async () => {
    const response = await fetch(baseUrl + slug);
    const data = await response.json();
    setNoodle(data);
    console.log(data);
    // simpleSlider();
    // simplereview();
  };
  useEffect(() => {
    getData();
  }, []);
  return <div>Noodle</div>;
};

export default Noodle;
