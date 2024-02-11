
import {GoogleLogin} from '@react-oauth/google';
import {ThirdPartySignIn} from '../../services/authentication';
import {useDispatch} from 'react-redux';

export default function ThirdPartySignIns() {
  const dispatch = useDispatch();
  
  return (
    <div style={{textAlign: 'center', marginTop: '1rem',width: '300px'}}>
      <GoogleLogin
        onSuccess={({credential}) => {
          ThirdPartySignIn(dispatch, credential);
        }}
        onError={e => console.error(e)}
        shape='rectangle'
        size='large'
        width={'304px'}
        text='continue_with'
        logo_alignment='left'
        useOneTap
      />
    </div>
  );
}

