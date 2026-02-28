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
  const [a, setA] = useState(1);
  const [b, setB] = useState(3);
  const [result, setResult] = useState("");

  const validAValues = [1,3,5,7,9,11,15,17,19,21,23,25];

  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
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
    if (!inv) {
      setResult("Invalid key 'a'");
      return;
    }

    const output = text
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          let x = code - 65;
          return String.fromCharCode(
            ((inv * (x - b + 26)) % 26) + 65
          );
        }
        return char;
      })
      .join("");
    setResult(output);
  };

  return (
    <SectionCard title="I.III Affine Cipher">
      <div className="space-y-6">

        {/* TEXT AREA */}
        <div>
          <label className="text-sm font-bold text-gray-600">
            Text to Process
          </label>
          <textarea
            rows="4"
            className="w-full p-4 mt-2 border rounded-xl bg-slate-100"
            placeholder="HELLO"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* KEYS */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* MULTIPLIER */}
          <div>
            <label className="text-sm font-bold text-gray-600">
              Multiplier (a)
            </label>
            <select
              className="w-full p-3 mt-2 border rounded-xl bg-slate-100"
              value={a}
              onChange={(e) => setA(parseInt(e.target.value))}
            >
              {validAValues.map((val) => (
                <option key={val} value={val}>
                  {val} {val === 1 && "(Caesar with shift b)"}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Must be coprime with 26
            </p>
          </div>

          {/* SHIFT */}
          <div>
            <label className="text-sm font-bold text-gray-600">
              Shift (b)
            </label>
            <input
              type="number"
              className="w-full p-3 mt-2 border rounded-xl bg-slate-100"
              value={b}
              onChange={(e) => setB(parseInt(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-1">
              0–25, any integer
            </p>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl text-sm text-indigo-700">
          The multiplier 'a' must be coprime with 26 (no common factors other than 1) 
          for the cipher to be reversible.  
          Valid values: 1,3,5,7,9,11,15,17,19,21,23,25
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={encrypt}
            className="w-full py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Encrypt
          </button>

          <button
            onClick={decrypt}
            className="w-full py-3 rounded-xl font-bold bg-purple-500 text-white hover:bg-purple-600"
          >
            Decrypt
          </button>
        </div>

        {/* RESULT */}
        <div className="bg-slate-100 p-4 rounded-xl border">
          <p className="text-xs font-bold uppercase text-gray-500">
            Result
          </p>
          <p className="text-lg font-mono font-bold break-all mt-2">
            {result || "Result will appear here..."}
          </p>
        </div>

      </div>
    </SectionCard>
  );
};

/* ===================== TRANSPOSITION ===================== */
const TranspositionSection = () => {
  const [method, setMethod] = useState("rail"); // rail | columnar
  const [text, setText] = useState("");
  const [rails, setRails] = useState(3);
  const [result, setResult] = useState("");

  /* ================= RAIL FENCE ================= */

  const railFenceEncrypt = (text, key) => {
    if (key <= 1) return text;

    let rail = Array.from({ length: key }, () => []);
    let dirDown = false;
    let row = 0;

    for (let char of text) {
      rail[row].push(char);
      if (row === 0 || row === key - 1) dirDown = !dirDown;
      row += dirDown ? 1 : -1;
    }

    return rail.flat().join("");
  };

  const railFenceDecrypt = (cipher, key) => {
    if (key <= 1) return cipher;

    let rail = Array.from({ length: key }, () =>
      Array(cipher.length).fill(null)
    );

    let dirDown;
    let row = 0,
      col = 0;

    // Mark zigzag
    for (let i = 0; i < cipher.length; i++) {
      if (row === 0) dirDown = true;
      if (row === key - 1) dirDown = false;

      rail[row][col++] = "*";
      row += dirDown ? 1 : -1;
    }

    // Fill letters
    let index = 0;
    for (let i = 0; i < key; i++) {
      for (let j = 0; j < cipher.length; j++) {
        if (rail[i][j] === "*" && index < cipher.length) {
          rail[i][j] = cipher[index++];
        }
      }
    }

    // Read zigzag
    let result = "";
    row = 0;
    col = 0;
    for (let i = 0; i < cipher.length; i++) {
      if (row === 0) dirDown = true;
      if (row === key - 1) dirDown = false;

      result += rail[row][col++];
      row += dirDown ? 1 : -1;
    }

    return result;
  };

  /* ================= COLUMNAR ================= */

  const columnarEncrypt = (text, key) => {
    let columns = Array.from({ length: key }, () => "");
    for (let i = 0; i < text.length; i++) {
      columns[i % key] += text[i];
    }
    return columns.join("");
  };

  const columnarDecrypt = (cipher, key) => {
    let rows = Math.ceil(cipher.length / key);
    let columns = [];
    let index = 0;

    for (let i = 0; i < key; i++) {
      columns.push(cipher.slice(index, index + rows));
      index += rows;
    }

    let result = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < key; c++) {
        if (columns[c][r]) result += columns[c][r];
      }
    }

    return result;
  };

  /* ================= HANDLER ================= */

  const handleEncrypt = () => {
    if (method === "rail")
      setResult(railFenceEncrypt(text, rails));
    else setResult(columnarEncrypt(text, rails));
  };

  const handleDecrypt = () => {
    if (method === "rail")
      setResult(railFenceDecrypt(text, rails));
    else setResult(columnarDecrypt(text, rails));
  };

  /* ================= UI ================= */

  return (
    <SectionCard title="I.IV Transposition Cipher">
      <div className="space-y-6">

        {/* METHOD SELECT */}
        <div>
          <p className="text-sm font-bold text-gray-600 mb-2">
            Transposition Method
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setMethod("rail")}
              className={`w-full py-3 rounded-xl font-bold border ${
                method === "rail"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              Rail Fence
            </button>

            <button
              onClick={() => setMethod("columnar")}
              className={`w-full py-3 rounded-xl font-bold border ${
                method === "columnar"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              Columnar
            </button>
          </div>
        </div>

        {/* TEXT AREA */}
        <div>
          <label className="text-sm font-bold text-gray-600">
            Text to Process
          </label>
          <textarea
            rows="4"
            className="w-full p-4 mt-2 border rounded-xl bg-slate-100"
            placeholder="HELLO"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* RAIL COUNT */}
        <div>
          <p className="text-sm font-bold text-gray-600 mb-2">
            {method === "rail"
              ? "Number of Rails"
              : "Number of Columns"}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => rails > 2 && setRails(rails - 1)}
              className="w-12 h-12 rounded-lg bg-slate-200 text-xl font-bold"
            >
              -
            </button>

            <span className="text-3xl font-bold text-blue-600">
              {rails}
            </span>

            <button
              onClick={() => setRails(rails + 1)}
              className="w-12 h-12 rounded-lg bg-slate-200 text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={handleEncrypt}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500"
          >
             Encrypt
          </button>

          <button
            onClick={handleDecrypt}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500"
          >
             Decrypt
          </button>
        </div>

        {/* RESULT */}
        <div className="bg-slate-100 p-4 rounded-xl border">
          <p className="text-xs font-bold uppercase text-gray-500">
            Result
          </p>
          <p className="text-lg font-mono font-bold break-all mt-2">
            {result || "Result will appear here..."}
          </p>
        </div>

      </div>
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