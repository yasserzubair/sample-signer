import "./App.css";
import { ConnectButton } from "@suiet/wallet-kit";
import JsonSigner from "./JsonSigner";
import TextSigner from "./TextSigner";
import "@suiet/wallet-kit/style.css"; // don't forget to import default stylesheet
import { useState } from "react";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("text");
  const options = [{ label: "Text", value: "text" }, { label: "Json", value: "json" }]
  const [signature, setSignature] = useState("");

  return (
    <div className="App">
      <div style={{ paddingBottom: 40 }}>
        <h1 className="title">Hello, Suiet Wallet Kit</h1>
        <ConnectButton />
      </div>
      <div style={{ marginBottom: 20 }}>
        {options.map((option, index) => (
          <div style={{ display: "inline", padding: 20 }}>
            <input
              type="radio"
              name="radio-group"
              key={index}
              style={{ fontSize: 18 }}
              value={option.value}
              checked={option.value === selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            />
            <label htmlFor="radio-group">{option.label}</label>
          </div>
        ))}
      </div>
      <div>
        {selectedOption === "json" ? <JsonSigner setSignature={setSignature}></JsonSigner> : <TextSigner setSignature={setSignature}></TextSigner>}
      </div>

      {signature && <div>
        <h6>Signature</h6>
        <p style={{ textAlign: "left" }}>
          <b>MsgBytes:</b> {signature.messageBytes}
        </p>
        <p style={{ textAlign: "left" }}>
          <b> Signature:</b> {signature.signature}
        </p>
      </div>}
    </div>
  );
}
