import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(null);

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.length >= 8);
    setConfirmPasswordValid(value === confirmPassword); // re-check confirm password
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordValid(password === value);
  };

  const handleSubmit = () => {
    if (!emailValid || !passwordValid || !confirmPasswordValid) {
      alert('Form cannot be submitted. Please fix the errors.');
      return;
    }

    alert('Form submitted successfully!');
    console.log({ email, password, confirmPassword });
  };

  const getInputStyle = (isValid) => {
    if (isValid === null) return defaultInputStyle;
    return {
      ...defaultInputStyle,
      border: `2px solid ${isValid ? 'green' : 'red'}`,
    };
  };

  const defaultInputStyle = {
    width: '300px',
    height: '30px',
    borderRadius: '8px',
    padding: '5px',
    fontSize: '15px',
    outline: 'none',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          style={getInputStyle(emailValid)}
          value={email}
          onChange={handleEmailChange}
        />
        {emailValid === false && (
          <span style={{ color: 'red', fontSize: '13px' }}>
            Please enter a valid email address.
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          style={getInputStyle(passwordValid)}
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordValid === false && (
          <span style={{ color: 'red', fontSize: '13px' }}>
            Password must be at least 8 characters long.
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Confirm password"
          style={getInputStyle(confirmPasswordValid)}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordValid === false && (
          <span style={{ color: 'red', fontSize: '13px' }}>
            Passwords do not match.
          </span>
        )}
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
