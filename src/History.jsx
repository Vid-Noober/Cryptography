import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import General from "./assets/public/General.png";
import Affine from "./assets/public/Affine.png";
import Transposition from "./assets/public/Transposition.png";
import RSA from "./assets/public/RSA.png";

/* ===================== MAIN COMPONENT ===================== */
const History = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 space-y-12 font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-center gap-8 text-sm font-medium">
          <a
            onClick={() => navigate("/")}
            className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer project-title"
          >
            Home
          </a>
          <a
            onClick={() =>
              document.getElementById("classical")?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-blue-600 cursor-pointer project-title"
          >
            Projects
          </a>
        </div>
      </nav>

      {/* Page Header */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 project-title">
        History of Cryptography
      </h1>

      {/* Classical Cryptography Introduction */}
      <SectionCard id="classical" title="I. Classical Cryptography">
        <p className="text-black leading-relaxed">
          Classical cryptography refers to the traditional methods of encryption
          used before the modern computer era. These techniques were mainly based
          on substitution and transposition of letters.
        </p>
      </SectionCard>

      {/* Cipher Sections */}
      <CaesarSection />
      <GeneralShiftSection />
      <AffineSection />
      <TranspositionSection />
      <RSASection />
    </div>
  );
};

/* ===================== CAESAR ===================== */
const CaesarSection = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("No Result");

  const shift = (value) => {
    const output = text.toUpperCase().split("").map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        let moved = (code - 65 + value) % 26;
        if (moved < 0) moved += 26;
        return String.fromCharCode(moved + 65);
      }
      return char;
    }).join("");
    setResult(output);
  };

  return (
    <SectionCard title="I.I Caesar Cipher">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Caesar_cipher_left_shift_of_3.svg"
            alt="Caesar Cipher"
            className="w-full h-48 object-cover rounded-lg border border-slate-300"
          />
          <p className="text-black project-title">
            Julius Caesar shifted letters in the alphabet by three positions to send secret messages to his generals.
          </p>
          <p className="text-sm text-black">Source: caesarcipher.net</p>
        </div>

        <div className="flex-1 space-y-3">
          <DemoInput text={text} setText={setText} placeholder="Ex: Will you marry me " />
          <div className="flex gap-3 mt-2">
            <Button onClick={() => shift(3)}>Encrypt</Button>
            <Button secondary onClick={() => shift(-3)}>Decrypt</Button>
          </div>
          <ResultBox result={result} />
        </div>
      </div>
    </SectionCard>
  );
};

/* ===================== GENERAL SHIFT ===================== */
const GeneralShiftSection = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState(0);
  const [result, setResult] = useState("No Result");

  const handleCipher = (isEncrypt) => {
    const shiftKey = parseInt(key) || 0;
    const output = text.toUpperCase().split("").map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        let shift = isEncrypt ? shiftKey : -shiftKey;
        let moved = (code - 65 + shift) % 26;
        if (moved < 0) moved += 26;
        return String.fromCharCode(moved + 65);
      }
      return char;
    }).join("");
    setResult(output);
  };

  return (
    <SectionCard title="I.II General Shift Cipher">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <img
            src={General}
            alt="General Shift Cipher"
            className="w-full h-48 object-cover rounded-lg border border-slate-300"
          />
          <p className="text-black project-title">
            The General Shift Cipher allows any integer value as the shift, making it more flexible than the Caesar Cipher.
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <DemoInput text={text} setText={setText} placeholder="Ex: Will you marry me " />
          <NumberInput label="Enter the key:" value={key} setValue={setKey} />
          <div className="flex gap-3 mt-2">
            <Button onClick={() => handleCipher(true)}>Encrypt</Button>
            <Button secondary onClick={() => handleCipher(false)}>Decrypt</Button>
          </div>
          <ResultBox result={result} />
        </div>
      </div>
    </SectionCard>
  );
};

/* ===================== AFFINE ===================== */
const AffineSection = () => {
  const [text, setText] = useState("");
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [result, setResult] = useState("No Result");

  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
    return null;
  };

  const encrypt = () => {
    const output = text.toUpperCase().split("").map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        let x = code - 65;
        return String.fromCharCode(((a * x + b) % 26) + 65);
      }
      return char;
    }).join("");
    setResult(output);
  };

  const decrypt = () => {
    const inv = modInverse(a, 26);
    if (!inv) return setResult("Invalid key a");
    const output = text.toUpperCase().split("").map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        let x = code - 65;
        return String.fromCharCode((inv * (x - b + 26)) % 26 + 65);
      }
      return char;
    }).join("");
    setResult(output);
  };

  return (
    <SectionCard title="I.III Affine Cipher">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <img src={Affine} alt="Affine Cipher" className="w-full h-48 object-cover rounded-lg border border-slate-300" />
          <p className="text-black project-title">
            The Affine Cipher combines multiplication and addition to encrypt letters.
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <DemoInput text={text} setText={setText} placeholder="Ex: Will you marry me " />
          <NumberInput label="Enter key a:" value={a} setValue={setA} />
          <NumberInput label="Enter key b:" value={b} setValue={setB} />
          <div className="flex gap-3 mt-2">
            <Button onClick={encrypt}>Encrypt</Button>
            <Button secondary onClick={decrypt}>Decrypt</Button>
          </div>
          <ResultBox result={result} />
        </div>
      </div>
    </SectionCard>
  );
};

/* ===================== TRANSPOSITION ===================== */
const TranspositionSection = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState(2);
  const [result, setResult] = useState("No Result");

  const encrypt = () => {
    let res = "";
    for (let i = 0; i < key; i++)
      for (let j = i; j < text.length; j += key)
        res += text[j];
    setResult(res);
  };

  const decrypt = () => {
    let res = Array(text.length).fill("");
    let index = 0;
    for (let i = 0; i < key; i++)
      for (let j = i; j < text.length; j += key)
        res[j] = text[index++];
    setResult(res.join(""));
  };

  return (
    <SectionCard title="I.IV Transposition Cipher">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <img src={Transposition} alt="Transposition Cipher" className="w-full h-48 object-cover rounded-lg border border-slate-300" />
          <p className="text-black project-title">
            Transposition Cipher rearranges letters in a defined pattern according to the key.
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <DemoInput text={text} setText={setText} placeholder="Ex: Will you marry me " />
          <NumberInput label="Enter the key:" value={key} setValue={setKey} />
          <div className="flex gap-3 mt-2">
            <Button onClick={encrypt}>Encrypt</Button>
            <Button secondary onClick={decrypt}>Decrypt</Button>
          </div>
          <ResultBox result={result} />
        </div>
      </div>
    </SectionCard>
  );
};

/* ===================== RSA ===================== */
const RSASection = () => {
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [result, setResult] = useState("No Result");

  const generate = () => {
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    setResult(`n = ${n}, φ(n) = ${phi}`);
  };

  return (
    <SectionCard title="II. RSA Cryptography">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <img src={RSA} alt="RSA Cipher" className="w-full h-48 object-cover rounded-lg border border-slate-300" />
          <p className="text-black project-title">
            RSA is an asymmetric encryption algorithm based on prime numbers.
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <NumberInput label="Enter prime p:" value={p} setValue={setP} />
          <NumberInput label="Enter prime q:" value={q} setValue={setQ} />
          <Button onClick={generate}>Generate Key</Button>
          <ResultBox result={result} />
        </div>
      </div>
    </SectionCard>
  );
};

/* ===================== REUSABLE COMPONENTS ===================== */
const SectionCard = ({ id, title, children }) => (
  <div id={id} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 max-w-4xl mx-auto my-6">
    <h2 className="text-2xl font-bold text-indigo-700 mb-4 project-title">{title}</h2>
    {children}
  </div>
);

const DemoInput = ({ text, setText, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-400 outline-none text-black project-title"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
);

const NumberInput = ({ label, value, setValue }) => (
  <div className="mt-3">
    <label className="block text-xs font-bold text-black uppercase mb-1 project-title">{label}</label>
    <input
      type="number"
      className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-400 outline-none text-black project-title"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

const Button = ({ children, onClick, secondary }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 px-5 rounded-xl font-bold transition project-title ${
      secondary
        ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
        : "bg-indigo-600 text-white hover:bg-indigo-700"
    }`}
  >
    {children}
  </button>
);

const ResultBox = ({ result }) => (
  <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
    <p className="text-xs font-bold text-indigo-400 uppercase project-title">Result:</p>
    <p className="text-lg font-mono font-bold text-black break-all project-title">{result}</p>
  </div>
);

export default History;
