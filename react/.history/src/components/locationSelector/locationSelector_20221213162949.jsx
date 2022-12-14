import React, { useEffect, useState } from 'react';
import styles from './locationSelector.module.css';

import { FaArrowRight } from 'react-icons/fa';

import Departure from '../departure/departure';
import Arrival from '../arrival/arrival';
import { useNavigate, useParams } from 'react-router-dom';
import getData from '../../service/getData';



function LocationSelector(props) {

  let params = useParams();
  console.log(`๐ฅ๐ฅ`, params);

  const [loginId, setLoginId] = useState("๋ก๊ทธ์ธ");
  useEffect(() => {
    const getUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue';
    getData(getUrl)
      .then(data => {
        console.log(data);
        const isLoginSucceed = data.data[0]['loginSuccess'];
        const loginId = data.data[0]['loginId'];
        console.log(isLoginSucceed);
        //console.log(JSON.parse(data['nowId']))
        setLoginId(loginId);
      })  
  }, []);

  const navigate = useNavigate();
  
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');


  const departureHandler = (departure) => {
    setDeparture(departure);
  };

  const arrivalHandler = (arrival) => {
    setArrival(arrival);
  };

  const submitHandler = () => {
    if(departure === ""){
      alert('์ง์ ๋ ์ถ๋ฐ์ง๋ก ์ค์ ํ์ธ์');
      return
    }
    else if(arrival === ""){
      alert('์ง์ ๋ ๋์ฐฉ์ง๋ก ์ค์ ํ์ธ์');
      return
    }
    navigate(`/list/${departure}/${arrival}`);
  }

  return (
    <div className={styles.locationSelector}>
      <div className={styles.location}>
        <div className={styles.departure}>
          <div className={styles.info}><span className={styles.ocos}>"</span><span>์ถ๋ฐ์ง</span><span className={styles.ocos}>"</span>๋ฅผ ์๋ ฅํด ์ฃผ์ธ์</div>
          <Departure className={styles.departureInput} departure={departure} onSet={departureHandler}/>
        </div>
        <FaArrowRight className={styles.arrow}/>
        <div className={styles.arrival}>
          <div className={styles.info}><span className={styles.ocos}>"</span><span>๋์ฐฉ์ง</span><span className={styles.ocos}>"</span>๋ฅผ ์๋ ฅํด ์ฃผ์ธ์</div>
          <Arrival className={styles.arrivalInput} arrival = {arrival} onSet={arrivalHandler}/>
        </div>
      </div>
      <button 
        className={styles.submitBtn}
        onClick={submitHandler}
          >
        ๊ฐ์ด ์ด๋ํ  ์ฌ๋ ์ฐพ๊ธฐ
      </button>
    </div>
  );
  
}

export default LocationSelector;