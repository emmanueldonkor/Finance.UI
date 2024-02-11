
import { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import { SignUp } from '../../services/authentication';
import ThirdPartySignIns from './ThirdPartySignIns';
import { useDispatch } from 'react-redux';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userExistError, setUserExistError] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError('');
    setUserExistError('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Custom validation
    if (!username) {
      setUsernameError('Please enter your username.');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 7) {
      setPasswordError('Password must be at least 7 characters long.');
      return;
    }

    try {
      await SignUp(dispatch, { username, password, email });
      console.log('Signup details:', { username, email, password });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setUserExistError('User already exists');
      } else {
        console.log('Error', error);
      }
    }
  };

  return (
    <div style={{ width: '19rem', margin: 'auto', marginTop: '50px', zIndex: 'auto', boxShadow:" box-shadow: 0 0 10px" }}>
      <Form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: 'center', padding:'15px' }}>
          <FaLock style={{ marginRight: '8px', color: '#3498db' }} />
        </h3>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="username"
            style={{ width: '70%', borderColor: 'lightblue' }}
            onChange={handleUsernameChange}
          />
          {usernameError || userExistError ? (
            <div style={{ color: 'red' }}>
              {userExistError && <div>{userExistError}</div>}
              {usernameError && <div>{usernameError}</div>}
            </div>
          ) : null}
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="email"
            style={{ width: '70%', borderColor: 'lightblue' }}
            onChange={handleEmailChange}
          />
          <span>{emailError && <div style={{ color: 'red' }}>{emailError}</div>}</span>
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="password"
            type="password"
            onChange={handlePasswordChange}
          />
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </InputGroup>
        <Button
          type="submit"
          variant="primary"
          style={{
            margin: 'auto',
            display: 'block',
            width: '100%',
          }}
        >
          Sign Up
        </Button>
      </Form>
      <div style={{ padding: '0.3rem'}}>
        <div style={{textAlign:'center'}}> <small>or</small></div>
        <ThirdPartySignIns />
      </div>
    </div>
  );
};

export default SignUpPage;
