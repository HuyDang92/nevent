import { useLogInGoogleMutation } from './features/Auth/authApi.service';
import { useAppSelector } from './hooks/useActionRedux';
import AppRoutes from './routes';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const auth = useAppSelector((state) => state.auth);
  const [loginGoogle] = useLogInGoogleMutation();
  return (
    <div className="">
      {!auth.loggedIn && (
        <div className="hidden">
          <GoogleOAuthProvider clientId="131707393120-pqm30aenjo1rhd4hchg4frkce200hjh1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                loginGoogle({ accessToken: credentialResponse.credential });
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
      )}
      <AppRoutes />
    </div>
  );
}

export default App;
