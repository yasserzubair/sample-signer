import React, { useState } from 'react';
import { useWallet } from '@suiet/wallet-kit'

const KeyValueInput = (props) => {
  const [data, setData] = useState([{ key: '', value: '' }]);
  const wallet = useWallet();

  const handleKeyChange = (index, value) => {
    const newData = [...data];
    newData[index].key = value;
    setData(newData);
  };

  const handleValueChange = (index, value) => {
    const newData = [...data];
    newData[index].value = value;
    setData(newData);
  };

  const handleAddPair = () => {
    setData([...data, { key: '', value: '' }]);
  };

  const handleRemovePair = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };


  const handleGenerateJSON = async () => {

    const jsonData = {};
    data.forEach(item => {
      if (item.key !== '') {
        jsonData[item.key] = item.value;
      }
    });
    console.log(JSON.stringify(jsonData, null, 2)); // Display JSON in console
    const msgBytes = new TextEncoder().encode(JSON.stringify(jsonData))
    const signature = await wallet.signMessage({ message: msgBytes });
    console.log(signature)
    props.setSignature(signature)
  };



  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={e => handleKeyChange(index, e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={e => handleValueChange(index, e.target.value)}
          />
          <button onClick={() => handleRemovePair(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddPair}>Add Key-Value Pair</button>
      <div style={{ padding: 20 }}>
        <button style={{ padding: 20 }} onClick={handleGenerateJSON}>SIGN JSON</button>
      </div>
    </div>
  );
};

export default KeyValueInput;
