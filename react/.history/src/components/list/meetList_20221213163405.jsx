import React, { useEffect } from 'react';
import { useState } from 'react';
import {v4 as uuidV4} from 'uuid';
import styles from './meetList.module.css';
import { FaArrowRight } from 'react-icons/fa';
import {json, useNavigate, useParams } from 'react-router-dom';
import Meet from '../meet/meet';
import { FiDatabase } from 'react-icons/fi';
import getData from '../../service/getData';


function MeetList(props) {

  let params = useParams();
  console.log(`π₯π₯`, (params['*'].split('/'))[2]);
  let param_userId = (params['*'].split('/'))[2];
  console.log(param_userId);

  const navigate = useNavigate();

  const [meetList, setMeetList] = useState([]);
  let param = useParams();
  // console.log(param['*']);
  const depLoc = param['*'].split('/')[0];
  const arrLoc = param['*'].split('/')[1]
  console.log(param['*'].split('/'));

  const meetUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/getmeeting'
  useEffect(() => {
      getData(meetUrl)
      .then(data => {
        console.log("μμΉ λ°μ΄ν°λ₯Ό λ°μμμ΅λλ€π₯")
        setMeetList(data['data']);
        console.log(data);
  })
  }, []);

  
  return (
    <div className={styles.meetList}>
      <div className={styles.location}>
        <div className={styles.locationDeparture}>
          <label className={styles.meetListLabel}htmlFor='departure'>μΆλ°</label>
          <input readOnly={true}
              type="text"
              id='departure'
              name='departure'
              value = {depLoc}
          />
        </div>
      <FaArrowRight className={styles.locationArrow}/>
      <div className={styles.locationArrival}>
        <label className={styles.meetListLabel} htmlFor='arrival'>λμ°©</label>
          <input
              readOnly={true}
              type="text"
              id='arrival'
              name='arrival'
              value = {arrLoc}
          />    
        </div>    
      </div>
      <button className={styles.btn_create} onClick={(e) => {
        navigate('/create');
      }}>λͺ¨μ§νκΈ°</button>
      <ul className={styles.meetUl}>
        {meetList.map((item) => {
          if(item.departure === depLoc && item.arrival === arrLoc){
            
            return (
              <Meet
                randomKey = {item.randomKey} // key κ°μ randomKeyλ‘ μ€μ 
                key={item.randomKey}
                id={item.id}
                title={item.title}
                departure={item.departure}
                arrival={item.arrival}
                recruitment={item.recruitment}
                remainingTime={item.remainingTime}
                transport={item.transport}
               />
              ) 
          }
        })}
      </ul>
    </div>
  );
}

export default MeetList;