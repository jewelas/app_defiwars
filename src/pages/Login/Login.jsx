import React, { useState } from 'react';
import axios from 'axios';
import style from './Login.css';
import appStyle from '../../App.module.css';
import Store from '../../store/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const store = Store.store;
  const JWT = store.getStore('JWT');
  const loggedin = store.getStore('loggedin');
  const navigate = useNavigate();

  const [state, setState] = useState({
    address: '',
    email: '',
    nickname: '',
    signature: '',
    publicName: '',
    JWT: JWT,
    loggedin: loggedin,
    errorMessage: null,
  });

  const trylogin = (signature) => {
    const accountAddress = store.getStore('accountAddress');
    console.log(signature);
    axios
      .post(
        '/ajax.php', {
        request: 'auth',
        publicName: state.publicName,
        email: state.email,
        address: accountAddress,
        signature: signature,
      },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
      )
      .then(
        function(response) {
          if (response.data[0] === 'Success') {
            store.setLogin(true);
            store.setJWT(response.data[2]);
            setState({ JWT: response.data[2] });
            setState({ loggedin: true });
          } else {
            setState({ errorMessage: response.data });
          }
        }
      )
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const web3 = store.getStore('web3');
    const accountAddress = store.getStore('accountAddress');
    const { publicName, email, nickname } = state;
    if (email !== '') {
      axios
        .post(
          '/ajax.php', {
          request: 'login',
          publicName: publicName,
          email: email,
          nickname: nickname,
          address: accountAddress,
        },
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          },
        )
        .then(async function(response) {
          if (response.data.substring(0, 5) !== 'Error') {
            let message = response.data;
            let signature = await web3.eth.personal.sign(web3.utils.fromUtf8(message), accountAddress);
            console.log(signature);
            let nextresponse = await axios.post('/ajax.php', {
              request: 'auth',
              publicName: publicName,
              email: email,
              nickname: nickname,
              address: accountAddress,
              signature: signature,
            },
              {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              },
            );
            console.log(nextresponse);
            if (nextresponse.data[0] === 'Success') {
              store.setLogin(true);
              store.setJWT(nextresponse.data[2]);
              setState({ JWT: nextresponse.data[2] });
              setState({ loggedin: true });
              navigate('/Home');
            } else {
              setState({ errorMessage: nextresponse.data });
            }

          } else {
            setState({ errorMessage: response.data });
          }
        })
    } else {
      setState({ errorMessage: 'Email and Name cannot be empty' });
    }
  }

  const onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    setState(val)
  }

  return (
    <div className={appStyle.container}>
      <div className='main-form'>
        <div className='left-form'> {
          state.errorMessage && (
            <p className={style.error}> {state.errorMessage} </p>
          )
        }
        </div>
        <div className='right-form'> {
          state.loggedin && (
            <p className={style.error}> Welcome back! </p>
          )
        } {
            !state.loggedin && (
              <form onSubmit={handleSubmit}>
                <div className={style.form}>
                  <input name='nickname'
                    id={'nickname'}
                    placeholder='nickname'
                    value={state.nickname}
                    onChange={onChange}
                  >
                  </input>
                  <input name='publicName'
                    id={'publicName'}
                    placeholder='Name'
                    value={state.publicName}
                    onChange={onChange}
                  >
                  </input>
                  <input name='email'
                    id={'email'}
                    placeholder='E-mail'
                    value={state.email}
                    onChange={onChange}
                  >
                  </input>
                  <button type='submit'> LOGIN </button>
                </div>
              </form>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
