// KindaCode.com
// src/components/MySwitch.js

// CSS is very important for our switch component
import './MySwitch.css';

export const MySwitch = ({ value, onChange, rounded }) => {
  return (
    <>
      <label className='my-switch'>
        <input type='checkbox' checked={value} onChange={onChange} />
        <span className={`slider ${rounded ? 'rounded' : ''}`}></span>
      </label>
    </>
  );
};