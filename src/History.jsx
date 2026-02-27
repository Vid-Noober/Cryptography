import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import General from "./assets/public/General.png";
import Affine from "./assets/public/Affine.png";
import Transposition from "./assets/public/Transposition.png";
import RSAImg from "./assets/public/RSA.png";

/* ===================== MAIN COMPONENT ===================== */
const History = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 space-y-12 font-sans">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        History of Cryptography
      </h1>

      <SectionCard title="I. Classical Cryptography">
        <p className="text-black leading-relaxed">
          Classical cryptography refers to traditional encryption techniques
          based on substitution and transposition before the modern computer era.
        </p>
      </SectionCard>

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
    const output = text
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          let moved = (code - 65 + value) % 26;
          if (moved < 0) moved += 26;
          return String.fromCharCode(moved + 65);
        }
        return char;
      })
      .join("");
    setResult(output);
  };

  return (
    <SectionCard title="I.I Caesar Cipher">
      <DemoInput text={text} setText={setText} placeholder="Ex: HELLO" />
      <div className="flex gap-3 mt-3">
        <Button onClick={() => shift(3)}>Encrypt</Button>
        <Button secondary onClick={() => shift(-3)}>Decrypt</Button>
      </div>
      <ResultBox result={result} />
    </SectionCard>
  );
};

/* ===================== GENERAL SHIFT ===================== */
const GeneralShiftSection = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState(0);
  const [result, setResult] = useState("No Result");

  const handleCipher = (encrypt) => {
    const shiftKey = parseInt(key) || 0;
    const output = text
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          let shift = encrypt ? shiftKey : -shiftKey;
          let moved = (code - 65 + shift) % 26;
          if (moved < 0) moved += 26;
          return String.fromCharCode(moved + 65);
        }
        return char;
      })
      .join("");
    setResult(output);
  };

  return (
    <SectionCard title="I.II General Shift Cipher">
      <DemoInput text={text} setText={setText} placeholder="Ex: Will you marry me " />
      <NumberInput label="Enter Key" value={key} setValue={setKey} />
      <div className="flex gap-3 mt-3">
        <Button onClick={() => handleCipher(true)}>Encrypt</Button>
        <Button secondary onClick={() => handleCipher(false)}>Decrypt</Button>
      </div>
      <ResultBox result={result} />
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
    const output = text
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          let x = code - 65;
          return String.fromCharCode(((a * x + b) % 26) + 65);
        }
        return char;
      })
      .join("");
    setResult(output);
  };

  const decrypt = () => {
    const inv = modInverse(a, 26);
    if (!inv) return setResult("Invalid key a");

    const output = text
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          let x = code - 65;
          return String.fromCharCode((inv * (x - b + 26)) % 26 + 65);
        }
        return char;
      })
      .join("");
    setResult(output);
  };

  return (
    <SectionCard title="I.III Affine Cipher">
      <DemoInput text={text} setText={setText} placeholder="Ex: Will you marry me" />
      <NumberInput label="Key a" value={a} setValue={setA} />
      <NumberInput label="Key b" value={b} setValue={setB} />
      <div className="flex gap-3 mt-3">
        <Button onClick={encrypt}>Encrypt</Button>
        <Button secondary onClick={decrypt}>Decrypt</Button>
      </div>
      <ResultBox result={result} />
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
      for (let j = i; j < text.length; j += key) res += text[j];
    setResult(res);
  };

  const decrypt = () => {
    let res = Array(text.length).fill("");
    let index = 0;
    for (let i = 0; i < key; i++)
      for (let j = i; j < text.length; j += key) res[j] = text[index++];
    setResult(res.join(""));
  };

  return (
    <SectionCard title="I.IV Transposition Cipher">
      <DemoInput text={text} setText={setText} placeholder="Ex: Will you marry me" />
      <NumberInput label="Enter Key" value={key} setValue={setKey} />
      <div className="flex gap-3 mt-3">
        <Button onClick={encrypt}>Encrypt</Button>
        <Button secondary onClick={decrypt}>Decrypt</Button>
      </div>
      <ResultBox result={result} />
    </SectionCard>
  );
};

/* ===================== RSA SECTION (UPDATED LIKE IMAGE) ===================== */
const RSASection = () => {
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [e, setE] = useState(7);

  const [n, setN] = useState(null);
  const [phi, setPhi] = useState(null);
  const [d, setD] = useState(null);

  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const modInverse = (e, phi) => {
    for (let i = 1; i < phi; i++) {
      if ((e * i) % phi === 1) return i;
    }
    return null;
  };

  const generateKeys = () => {
    const primeP = parseInt(p);
    const primeQ = parseInt(q);
    const modulus = primeP * primeQ;
    const totient = (primeP - 1) * (primeQ - 1);

    if (gcd(e, totient) !== 1) {
      alert("e must be coprime with φ(n)");
      return;
    }

    const privateKey = modInverse(e, totient);

    setN(modulus);
    setPhi(totient);
    setD(privateKey);
  };

  const encrypt = () => {
    if (!n) return alert("Generate keys first!");

    const encrypted = plainText
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          const m = code - 65;
          return BigInt(m) ** BigInt(e) % BigInt(n);
        }
        return null;
      })
      .filter(Boolean)
      .join(" ");

    setCipherText(encrypted);
  };

  const decrypt = () => {
    if (!d) return alert("Generate keys first!");

    const decrypted = cipherText
      .split(" ")
      .map((num) => {
        const c = BigInt(num);
        const m = c ** BigInt(d) % BigInt(n);
        return String.fromCharCode(Number(m) + 65);
      })
      .join("");

    setDecryptedText(decrypted);
  };

  return (
    <SectionCard title="II. RSA Cryptography">
      <div className="space-y-8">
        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
             Key Generation
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <NumberInput label="Prime p" value={p} setValue={setP} />
            <NumberInput label="Prime q" value={q} setValue={setQ} />
          </div>

          <NumberInput label="Public exponent e" value={e} setValue={setE} />
          <Button onClick={generateKeys}>Generate Keys</Button>

          {n && (
            <div className="grid md:grid-cols-4 gap-4 mt-4">
              <ResultMini title="Modulus n" value={n} />
              <ResultMini title="Totient φ(n)" value={phi} />
              <ResultMini title="Public e" value={e} />
              <ResultMini title="Private d" value={d} />
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
             Encryption
          </h3>

          <DemoInput
            text={plainText}
            setText={setPlainText}
            placeholder="Enter message..."
          />
          <Button onClick={encrypt}>Encrypt</Button>
          <ResultBox result={cipherText || "Result will appear here.."} />
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
             Decryption
          </h3>

          <DemoInput
            text={cipherText}
            setText={setCipherText}
            placeholder="Enter ciphertext..."
          />
          <Button onClick={decrypt}>Decrypt</Button>
          <ResultBox result={decryptedText || "Result will appear here..."} />
        </div>
      </div>
    </SectionCard>
  );
};

/* ===================== REUSABLE COMPONENTS ===================== */
const SectionCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border max-w-4xl mx-auto my-6">
    <h2 className="text-2xl font-bold text-indigo-700 mb-4">{title}</h2>
    {children}
  </div>
);

const DemoInput = ({ text, setText, placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full p-3 border rounded-lg bg-slate-50"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
);

const NumberInput = ({ label, value, setValue }) => (
  <div className="mt-3">
    <label className="block text-xs font-bold uppercase mb-1">
      {label}
    </label>
    <input
      type="number"
      className="w-full p-3 border rounded-lg bg-slate-50"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

const Button = ({ children, onClick, secondary }) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-5 rounded-xl font-bold mt-3 ${
      secondary
        ? "bg-slate-200 hover:bg-slate-300"
        : "bg-indigo-600 text-white hover:bg-indigo-700"
    }`}
  >
    {children}
  </button>
);

const ResultBox = ({ result }) => (
  <div className="mt-4 p-4 bg-indigo-50 rounded-xl border">
    <p className="text-xs font-bold uppercase text-indigo-400">Result:</p>
    <p className="text-lg font-mono font-bold break-all">{result}</p>
  </div>
);

const ResultMini = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg border text-center">
    <p className="text-xs uppercase text-indigo-400 font-bold">{title}</p>
    <p className="text-lg font-mono font-bold">{value}</p>
  </div>
);

export default History;