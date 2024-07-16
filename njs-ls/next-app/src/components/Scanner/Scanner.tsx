import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Scanner = ({setScanResult}) => {
  const [result, setResult] = useState("");
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 600,
        height: 325,
      },
      fps: 5
    }, false);
    const success = (result) => {
      scanner.clear();
      setResult(result);
      setScanResult(result);
      console.log(result);
    };
    const error = (err) => {
      setResult("not found");

      console.log(err);
    };
    scanner.render(success, error);
  }, []);

  return (
    <div>
      <div id="reader"></div>
      <p>{result}</p>
      <p>{"result"}</p>
    </div>
  );
};

export default Scanner;