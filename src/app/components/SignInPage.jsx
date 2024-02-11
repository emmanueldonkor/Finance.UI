


import { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { SignIn } from '../../services/authentication';
import ThirdPartySignIns from './ThirdPartySignIns';
import { useDispatch } from 'react-redux';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError('');
    setPasswordError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Custom validation
    if (!username) {
      setUsernameError('Please enter your username.');
      setPasswordError('');
      return;
    }

    if (!password) {
      setUsernameError('');
      setPasswordError('Please enter your password.');
      return;
    }

    try {
      await SignIn(dispatch, { username, password });
      console.log('Signin details:', { username, password });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUsernameError('Incorrect username or password.');
        setPasswordError('Incorrect username or password.');
      } else {
        console.log('Error', error);
      }
    }
  };

  return (
    <div style={{ width: '19rem', margin: 'auto', marginTop: '50px', zIndex: 'auto' }}>
      <Form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: 'center', padding:"15px" }}>
         You are Welcome!
        </h3>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="username"
            style={{ width: '70%', borderColor: 'lightblue' }}
            onChange={handleUsernameChange}
          />
          {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            style={{ width: '70%', borderColor: 'lightblue' }}
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </InputGroup>
        <Button
          type="submit"
          variant="secondary"
          style={{
            margin: 'auto',
            display: 'block',
            width: '100%',
          }}
        >
          Sign In
        </Button>
      </Form>
      <div style={{ padding: '0.3rem'}}>
      <div style={{textAlign:'center'}}> <small>or</small></div>
        <ThirdPartySignIns />
      </div>
    </div>
  );
};

export default SignInPage;
