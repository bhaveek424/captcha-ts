import React, { useState } from 'react';
import { SignInForm } from '../types';
import Captcha from './Captcha';
import './SignIn.css';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: '',
    captcha: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [captcha, setCaptcha] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      setErrorMessage('Password must be atleast 8 characters long');
      return;
    }
    // compare user input for captcha code with the captcha text
    if (formData.captcha !== captcha) {
      setErrorMessage('Please enter the correct captcha code');
      return;
    }
    // proceed with sign in process
    console.log('Successful sign in');
    // Redirect the user to the YouTube video URL
    window.location.href = 'https://www.youtube.com/watch?v=0XGx_HoDbBs';
  };

  return (
    <div className="container">
      <div className="frame">
        <div className="nav">
          <li className="signin-active">
            <a className="btn">Sign in</a>
          </li>
        </div>
        <form
          className="form-signin"
          method="post"
          name="form"
          onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="form-styling"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-styling"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="captcha">Captcha:</label>
          <input
            className="form-styling"
            type="text"
            name="captcha"
            value={formData.captcha}
            onChange={handleChange}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Captcha captcha={captcha} setCaptcha={setCaptcha} />
          <button className="btn-signin" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
