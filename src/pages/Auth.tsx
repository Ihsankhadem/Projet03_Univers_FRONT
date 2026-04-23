

import { useState } from 'react';
import LoginForm from '../components/Authentification/LoginForm';
import RegisterForm from '../components/Authentification/RegisterForm';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin
    ? <LoginForm onSwitch={() => setIsLogin(false)} />
    : <RegisterForm onSwitch={() => setIsLogin(true)} />;
}
