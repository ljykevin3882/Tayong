import React from 'react';
import styles from './form.module.css';
import { FaSearch } from 'react-icons/fa';
import { FiCalendar} from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import postData from '../../service/postData';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';
import getData from '../../service/getData';


//axios.defaults.withCredentials = true;
function Form(props) {
  const navigate = useNavigate();

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [recruitment, setRecruitment] = useState("");
  const [transport, setTransport] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nowId, setNowId] = useState("");

  const getUrl = 'https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/loginValue';
    
  getData(getUrl)
    .then(data => {
     console.log(data.data[0]);
      console.log("πΌ",data.data[0]['loginId']); //μ¬κΈ°μ μλ°μμμ§λλ° 
      setNowId(data.data[0]['loginId']); // nowIdμ κ°μ΄ μλ€μ΄κ°μ§λ€μ..
    }) 
    
    setTimeout(
     ()=>{
       console.log("π₯",nowId);
     }, 3000
    );
    
  const submitHandler = (e) => {
    e.preventDefault();

    if(departure == "" || arrival == "" || remainingTime == "" || recruitment == "" || transport == "" || title == "" || content == ""){
      console.warn('μλ ₯λμ§ μμ ν­λͺ©μ΄ μμ΅λλ€.');
      window.alert('μλ ₯λμ§ μμ ν­λͺ©μ΄ μμ΅λλ€.');
      return
    }

    // meetUUID ν λΉ
    const randomKey = uuidv4();
    console.log(randomKey);


    // μ μ‘νλ λ°μ΄ν°μ randomKey ν¬ν¨ν΄ μ λ¬
    let postdata = {
      departure: departure,
      arrival: arrival,
      remainingTime: remainingTime,
      recruitment: recruitment,
      transport: transport,
      title: title,
      content: content,
      randomKey: randomKey,
      nowId: nowId
    }
    
    console.log(postdata);



    const MLurl =  'https://j99c2do1xe.execute-api.ap-northeast-2.amazonaws.com/tayong_stage/tayong_resource';
    axios.post(MLurl, `{"inputs": "${content}"}`)
    .then(
      res => {
        console.log('π₯²π₯²π₯²π₯²',res);
        console.log(JSON.parse(res['data']['body'])[0]['label']);
        const MLresult = JSON.parse(res['data']['body'])[0]['label'];
      if(MLresult == 'LABEL_1'){
        const url =' https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/postform';
        
          postData(url, postdata);
        
        
        navigate('/');
      }
      else{
        alertML();
      }
    }
    )

    const alertML = () => {
      Swal.fire({
        title: 'AI has filtered your post.',
        text: 'μ μ νμ§ μμ λ΄μ©μ΄ λ°κ²¬λμ΅λλ€. κΈμ μμ ν΄μ£ΌμΈμ.',
        icon: 'warning',
        confirmButtonText: 'λ€μ μμ±νκΈ°'
      })
    }

    // const url =' https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/postform';
    // postData(url, data);
    // navigate('/');


  }

  const backToListHandler = (e) => {
    navigate(-1);
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.locationContainer}>
          <div className={styles.departure}>
            <label className={styles.formLabel} htmlFor='departure'>μΆλ°μ§</label>
            <input type="text" id='departure' name='departure' maxLength='12' onChange={(e) => {setDeparture(e.target.value)}}/>
            <FaSearch className={styles.searchIcon}/>
          </div>
          <div className={styles.arrival}>
            <label className={styles.formLabel} htmlFor='arrival'>λμ°©μ§</label>
            <input type="text" id='arrival' name='arrival' maxLength='12' onChange={(e) => {setArrival(e.target.value)}}/>
            <FaSearch className={styles.searchIcon}/>
          </div>
        </div>
        <div className={styles.infoContainer}>

          <div className={styles.remainingTime}>
            <label className={styles.formLabel} htmlFor='remainingTime'>μΆλ°μΌ</label>
            <input type="date" id='remainingTime' name='remainingTime' onChange={(e) => {setRemainingTime(e.target.value)}}/>
          </div>
          
          <div className={styles.recruitment}>
            <label className={styles.formLabelRC} htmlFor='recruitment'>λͺ¨μ§μΈμ</label>
            <input type="text" id='recruitment' name='recruitment' maxLength='1' onChange={(e) => {setRecruitment(e.target.value)}}/>
            <p>λͺ</p>
          </div>

          <div className={styles.transport}>
            <label className={styles.formLabel} htmlFor='transport'>μ΄λμλ¨</label>
            <select className={styles.transportSelect} onChange={(e) => {setTransport(e.target.value)}}>
              <option>μ ν</option>
              <option>νμ</option>
              <option>μκ°μ©</option>
            </select>
          </div>

        </div>

        <div className={styles.title}>
          <label className={styles.formLabel} htmlFor='title'>μ λͺ©</label>
          <input type="text" id='title' name='title' onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        
        <div className={styles.content}>
          <label className={styles.formLabel} htmlFor='content'>λ΄μ©</label>
          <textarea cols="88" rows="6" maxLength="300" name='content' onChange={(e) => {setContent(e.target.value)}}></textarea>
        </div>
      </form>

      <div className={styles.btns}>
          <button className={styles.btn_backToList} type='button' onClick={backToListHandler}>λͺ©λ‘μΌλ‘</button>
          <button className={styles.btn_submit} onClick={submitHandler}>λ±λ‘νκΈ°</button>
      </div>

    </div>
  );
}

export default Form;