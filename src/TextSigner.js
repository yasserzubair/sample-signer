import React, { useState } from 'react';
import { useWallet } from '@suiet/wallet-kit'

const KeyValueInput = (props) => {
  const [data, setData] = useState("");

  const wallet = useWallet();


  const handleSignText = async () => {
    const msgBytes = new TextEncoder().encode(JSON.stringify(data))
    const signature = await wallet.signMessage({ message: msgBytes });
    console.log(signature)
    props.setSignature(signature)
  };



  return (
    <div>
      <input type="text" onChange={(e) => setData(e.target.value)} />
      <div style={{ padding: 20 }}>
        <button style={{ padding: 20 }} onClick={handleSignText}>SIGN TEXT</button>
      </div>

    </div>
  );
};

export default KeyValueInput;
