import React, { useRef, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [btnText, setBtnText] = useState("Connect Wallet");
  const [psbtPrint, setPsbtResult] = useState("now null");

  const unisat = (window as any).unisat;

  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  });
  const self = selfRef.current;

  const handleAccount = (_accounts: string[]) => {
    if (self.accounts[0] === _accounts[0]) {
      return;
    }
    self.accounts = _accounts;
    setBtnText(_accounts[0]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={async () => {
            const result = await unisat.requestAccounts();
            const network = await unisat.switchNetwork("testnet");
            handleAccount(result);
          }}
        >
          {btnText}
        </button>
        <button
          onClick={async () => {
            try {
              const response = await axios.post("http://127.0.0.1:5000/api/fetch", self.accounts[0]);
              console.log(response.data.psbtHex);
              const psbtParam = response.data.psbtHex
              const psbtResult = await unisat.signPsbt(psbtParam);
              console.log(psbtResult);
              setPsbtResult(psbtResult);
  
            } catch (error) {
            }
          }}
        >
          print(unisatSignPSBT)
        </button>
        <p>{psbtPrint}</p>
      </header>
    </div>
  );
}

export default App;
