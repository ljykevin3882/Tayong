import React, { useState } from 'react';
import styles from './meetDetail.module.css'
import { FiCalendar} from 'react-icons/fi';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getData from '../../service/getData';
import postData from '../../service/postData';

function MeetDetail(props) {

  let params = useParams();
  console.log(`๐ฅ๐ฅ๐ฝ๐ฝ๐ฝ`, (params['*'].split('/'))[0]);
  let param_userId = (params['*'].split('/'))[0];

  console.log(param_userId);


  const navigate = useNavigate();


  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [recruitment, setRecruitment] = useState("");
  const [transport, setTransport] = useState("");
  const [hostId, setHostId] = useState("user");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [randomKey, setRandomKey] = useState("");
  const[loginId, setLoginId] = useState("๋ก๊ทธ์ธ");

  //-----------------ML ํํธ ๊ฒฐ๊ณผ ๋ฐ์์ค๊ธฐ--------------------//
  const[resultML, setResultML] = useState(0);
  // 99๋ฒ์งธ ์ค๋ก ์ด๋
  // ์์ง ๋ฐ์์์ ์คํํ๋ ์ฝ๋๋ ์์.
  //----------------------------------------------//


  const imgTransport = 'https://img.freepik.com/free-photo/man-driving-car-from-rear-view_1359-494.jpg?w=1800&t=st=1667398765~exp=1667399365~hmac=8304fbbb3ab8792ecbc4535a7e8d5241ae499a2c44d4922f5de295d8b8df3d8f';
  const imgTaxi = 'https://img.freepik.com/free-photo/taxi-sign-roof-top-car_74190-1728.jpg?w=1800&t=st=1667398413~exp=1667399013~hmac=efcccc4afa78711c2ff1407418bf496be6c0ddf73fe37c1c3ecf06f936d5bc24'; 


  //-----------------์ฐธ์ฌํ๊ธฐ ๋ฒํผ--------------------//
  // ๋ก๊ทธ์ธ ์ ๋ณด ๋ฐ์์ค๊ธฐ
  useEffect(() => {
    
    const getUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue';
    getData(getUrl)
      .then(data => {
        const loginId = param_userId;
        setLoginId(loginId);
      })  
  }, [])


  // ์ฐธ์ฌํ๊ธฐ ๋ฒํผ ๋๋ฅด๋ฉด id์ meetId ์ ์กํ๊ธฐ
  const onJoinHandler = () => {
    // ์ฐธ์ฌํ๋ loginId๋ฅผ participateUrl๋ก postํฉ๋๋ค.
    const joinUrl = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/participate"

    // ๋ก๊ทธ์ธ ๋์ด์์ง ์์ผ๋ฉด ๊ฒฝ๊ณ ์ฐฝ์ ๋์๋๋ค.
    if(loginId == '๋ก๊ทธ์ธ'){
      alert('์ฐธ์ฌํ๋ ค๋ฉด ๋ก๊ทธ์ธ์ด ํ์ํฉ๋๋ค');
    }

    // ๋ก๊ทธ์ธ ๋์ด์์ผ๋ฉด ์ฐธ์ฌ ๋ฐ์ดํฐ๋ฅผ ์ ์กํ๊ณ , ํด๋น ๋ชจ์ ํ์ด์ง๋ก ์ด๋ํฉ๋๋ค. ์ด๋ randomKey๋ก url ์ด๋ํฉ๋๋ค.
    else{
      let joinData = {
        loginId: loginId,
        randomKey: randomKey  // ์ฐธ์ฌํ๊ธฐ ๋ฒํผ์ ๋๋ฅด๋ฉด ๋ก๊ทธ์ธ ํ ์์ด๋์, randomKey๊ฐ joinData๋ก ์ ์ก๋ฉ๋๋ค.
      }
      console.log('joinData', joinData);
      postData(joinUrl, joinData);
      navigate(`/participate/${param_userId}/${randomKey}`);
    }
  }

  //----------------------------------------------//


//-----------------๋ฐ์ดํฐ ๋ฐ์์ค๊ธฐ-------------------//
  let param = useParams();

  useEffect(() => {
    fetch('https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/getmeetdetail')
    .then(res => res.json())
    .then(data => {
      
      var k=0;
      for (var i = 0; i < data.length; i++) {
        if(data[i].randomKey==param['*'].split('/')[0]){     // ์ด์  ์ ๋ชฉ์ด ์๋ randomKey๋ก ํด๋น ๋ชจ์ ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ต๋๋ค!
            k=i;
            
        }
        
      }
      // console.log("dd"+param['*'].split('/'));
      setDeparture(data[k].departure);
      setArrival(data[k].arrival);
      setRemainingTime(data[k].remainingTime);
      setRecruitment(data[k].recruitment);
      setTransport(data[k].transport);
      setTitle(data[k].title);
      setContent(data[k].content);
      setHostId(data[k].id == 0? "user" : data[k].id );
      setRandomKey(data[k].randomKey);   // randomKey๋ฅผ meetDetail์์๋ ๋ฐ์์์ ๊ฐ๊ณ  ์์ต๋๋ค.
      // setResultML(JSON.parse(data['body'])[k].ML_recognition); // ML_recognition ๋ฐ์์์ resultML๋ก ์ ์ฅ
      console.log("this meet UUID = ",data[k].randomKey);
      
    });
  }, [])
  //----------------------------------------------//
  const selectImg = (transport) => {
    if(transport == '์๊ฐ์ฉ'){
      return imgTransport;
    } else{
      return imgTaxi;
    }
  }

  return (
    <div className={styles.container}>
        <img className={styles.imgTransport} src= {selectImg(`${transport}`)} alt="transport image" />
        <div className={styles.locAndUserContainer}>
          <div className={styles.location}>
            <div className={styles.departure}>
              <label className={styles.meetDetailLable} htmlFor='departure'>์ถ๋ฐ</label>
              <input type="text" id='departure' name='departure' value={departure} readOnly/>
            </div>
            <div className={styles.arrival}>
              <label className={styles.meetDetailLable} htmlFor='arrival'>๋์ฐฉ</label>
              <input type="text" id='arrival' name='arrival' value={arrival} readOnly/>
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <div className={styles.userInfoInfo}>๋ชจ์ง์</div>
              {/* <div className={styles.userAvatar}></div> */}
              <p>{hostId}</p>
            </div>
          </div>
        </div>
        <input className={styles.title} type="text" id='title' name='title' value={title} readOnly/>
        <div className={styles.info}>
          <div className={styles.recruitment}>
            <label className={styles.meetDetailLable} htmlFor='recruitment'>๋ชจ์ง์ธ์</label>
            <input type="text" id='recruitment' name='recruitment' value={recruitment} readOnly/>
            <p>๋ช</p>
          </div>
          <div className={styles.remainingTime}>
            <label className={styles.meetDetailLable} htmlFor='remainingTime'>์ถ๋ฐ์ผ</label>
            <input  type="text" id='remainingTime' name='remainingTime' value={remainingTime} readOnly/>
          </div>
        </div>

        <div className={styles.content}>
            <textarea cols="88" rows="6" maxLength="300" name='content' value={content} readOnly></textarea>
        </div>

        <div className={styles.btns}>
          {/* <button className={styles.btn_chat}><a href="http://tayongchat.s3-website.ap-northeast-2.amazonaws.com/">์ฑํํ๊ธฐ</a></button> */}
          <button className={styles.btn_backToList} onClick={() => {
            navigate(-1);
          }}>๋ชฉ๋ก์ผ๋ก</button>
          <button className={styles.btn_join} onClick={onJoinHandler}>์ฐธ์ฌํ๊ธฐ</button>
        </div>
    </div>
  );
}

export default MeetDetail;