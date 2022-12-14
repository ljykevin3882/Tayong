import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './header.module.css';
import getData from '../../service/getData';

function Header(props) {
  
  useEffect(() => {
    let params = useParams();
    console.log(`๐ฅ๐ฅ๐ฝ๐ฝ๐ฝ`, (params['*'].split('/'))[0]);
    let param_userId = (params['*'].split('/'))[0];
    console.log(param_userId);
    setLoginId(param_userId);
  }, [])


  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("๋ก๊ทธ์ธ");
  const [loginSucceed, setLoginSucceed] = useState(0);
  
  const showLoginId = () => {
    if(loginSucceed == 1||loginSucceed == '1'){
      return loginId;
    }
    else{
      return '๋ก๊ทธ์ธ';
    }
  }

  const showLogOut = () => {
    if(loginSucceed == 1||loginSucceed == '1'){
      console.log("โค๏ธ",loginSucceed)
      return "๋ก๊ทธ์์"
    }
    else{
      return "";
    }
  }

  // logout ๊ธฐ๋ฅ
  const logOutHanlder = () => {
    const logoutUrl  = "https://yw1nspc2nl.execute-api.ap-northeast-2.amazonaws.com/dev/logout";
    getData(logoutUrl)
    .then((data) => {
      console.log("๐",data);
      setLoginSucceed(0);
  });
  }



  return (
    <>
      <nav className={styles.navbar}>
        <p className={styles.logo} onClick={() => {
          navigate(`/`)
        }} >Tayong</p>
        <div className={styles.navbarBtn}>
          <button className={styles.loginBtn} onClick={() => {navigate('/login')}}>{showLoginId()}</button>
          <button className={styles.btn} onClick={() => {logOutHanlder()}}>{showLogOut()}</button>
        </div>  
      </nav>
    </>
  );
}

export default Header;