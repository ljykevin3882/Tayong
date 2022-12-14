import React, { useEffect } from 'react';
import { useState } from 'react';
import {v4 as uuidV4} from 'uuid';
import styles from './meetList.module.css';
import { FaArrowRight } from 'react-icons/fa';
import {useNavigate, useParams } from 'react-router-dom';
import Meet from '../\bmeet/meet';


function MeetList(props) {

  const navigate = useNavigate();

  const [meetList, setMeetList] = useState([]);
  let param = useParams();
  // console.log(param['*']);
  const depLoc = param['*'].split('/')[0];
  const arrLoc = param['*'].split('/')[1]
  console.log(param['*'].split('/'));

  const onClickHandler = (e) => {
    console.log('you clicked meet!π');
    console.log(e);
  }

  useEffect(() => {
    fetch('data/meet.json')
    .then(res => res.json())
    .then(data => {
      console.log('λͺ¨μ λ°μ΄ν°λ₯Ό λ°μμμ΅λλ€π₯');
      setMeetList(data);
    });
  }, [])

  
  return (
    <div className={styles.meetList}>
      <div className={styles.location}>
        <div className={styles.locationDeparture}>
          <label htmlFor='departure'>μΆλ°</label>
          <input readOnly={true}
              type="text"
              id='departure'
              name='departure'
              value = {depLoc}
          />
        </div>
      <FaArrowRight className={styles.locationArrow}/>
      <div className={styles.locationArrival}>
        <label htmlFor='arrival'>λμ°©</label>
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
      <ul className={styles.list} onClick={onClickHandler}>
        {meetList.map((item) => {
          if(item.departure === depLoc && item.arrival === arrLoc){
            return (
              <Meet
                key = {item.id}
                id={item.id}
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