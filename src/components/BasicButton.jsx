import React from 'react';

export default function BasicButtion() {
  const [hello, setHello] = React.useState('');

  return <button onClick={() => setHello('Hello')}>
    Hi {hello}
  </button>
}