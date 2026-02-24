import React from "react";

export default function CryptographyReport() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-14 space-y-16">

        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
            Historical Overview of Classical Cryptography and RSA Cryptography
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto">
            A detailed academic report explaining the historical development and
            practical applications of classical and RSA cryptographic systems.
          </p>
        </header>

        {/* Classical Section */}
        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 border-l-4 border-blue-500 pl-4">
            1. Classical Cryptography
          </h2>

          <img
            src="https://images.unsplash.com/photo-1581090700227-1e8a1b6c5c5d"
            alt="Ancient encryption manuscript"
            className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-lg hover:scale-[1.01] transition duration-300"
          />

          <div className="space-y-4 text-slate-700 leading-relaxed text-justify">
            <p>
              Classical cryptography refers to encryption techniques developed
              before modern computers. These systems were primarily manual and
              used linguistic and mathematical techniques to protect military,
              political, and diplomatic communication.
            </p>
            <p>
              Early examples date back to ancient civilizations. Around 50 BCE,
              Julius Caesar introduced the Caesar Cipher. In the 9th century,
              Al-Kindi developed frequency analysis, forming the foundation of
              scientific cryptanalysis. Later, in 1918, Arthur Scherbius
              invented the Enigma machine, used extensively during World War II.
            </p>
          </div>

          {/* Technique Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 hover:shadow-lg transition p-6 rounded-2xl border">
              <h3 className="font-semibold text-lg mb-2 text-blue-600">
                Substitution Techniques
              </h3>
              <p>
                Each letter is replaced according to a rule. Security depends on
                secrecy of the substitution pattern.
              </p>
            </div>

            <div className="bg-slate-50 hover:shadow-lg transition p-6 rounded-2xl border">
              <h3 className="font-semibold text-lg mb-2 text-blue-600">
                Transposition Techniques
              </h3>
              <p>
                Characters are rearranged without changing them. Security lies
                in hiding the correct order.
              </p>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-blue-50 p-6 rounded-3xl shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              Applications of Classical Cryptography
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Ancient and early modern military communication.</li>
              <li>Diplomatic correspondence before digital security.</li>
              <li>Educational teaching of cryptographic principles.</li>
              <li>Puzzle and recreational cryptography design.</li>
              <li>Historical intelligence research (WWI & WWII).</li>
            </ul>
          </div>
        </section>

        {/* RSA Section */}
        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 border-l-4 border-green-500 pl-4">
            2. RSA Cryptography
          </h2>

          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
            alt="Digital security concept"
            className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-lg hover:scale-[1.01] transition duration-300"
          />

          <div className="space-y-4 text-slate-700 leading-relaxed text-justify">
            <p>
              RSA was introduced in 1977 as one of the first practical
              public-key cryptographic systems. It introduced asymmetric
              encryption using a public key and a private key.
            </p>
            <p>
              Its security is based on the computational difficulty of factoring
              very large composite numbers. When implemented with large key
              sizes, RSA remains highly secure and widely adopted.
            </p>
          </div>

          {/* RSA Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 hover:shadow-lg transition p-6 rounded-2xl border">
              <h3 className="font-semibold text-lg mb-2 text-green-600">
                Public Key Encryption
              </h3>
              <p>
                Public keys encrypt messages and verify digital signatures.
              </p>
            </div>

            <div className="bg-slate-50 hover:shadow-lg transition p-6 rounded-2xl border">
              <h3 className="font-semibold text-lg mb-2 text-green-600">
                Private Key Decryption
              </h3>
              <p>
                Private keys decrypt data and create secure digital signatures.
              </p>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-green-50 p-6 rounded-3xl shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">
              Applications of RSA Cryptography
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>HTTPS and SSL/TLS secure web communication.</li>
              <li>Online banking and secure financial transactions.</li>
              <li>Digital signatures for software and documents.</li>
              <li>Email encryption systems.</li>
              <li>Secure authentication (SSH, VPN).</li>
              <li>Enterprise and government security infrastructure.</li>
            </ul>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 border-l-4 border-purple-500 pl-4">
            3. Comparative Analysis
          </h2>

          <div className="overflow-x-auto rounded-2xl shadow">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 border">Feature</th>
                  <th className="p-4 border">Classical</th>
                  <th className="p-4 border">RSA</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 border">Historical Period</td>
                  <td className="p-4 border">Ancient – WWII</td>
                  <td className="p-4 border">1977 – Present</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 border">Key Structure</td>
                  <td className="p-4 border">Single Shared Key</td>
                  <td className="p-4 border">Public & Private Keys</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 border">Complexity</td>
                  <td className="p-4 border">Low</td>
                  <td className="p-4 border">High (Number Theory)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 border">Modern Usage</td>
                  <td className="p-4 border">Educational / Historical</td>
                  <td className="p-4 border">Internet & Digital Security</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm pt-8 border-t">
          © 2026 Cryptography Academic Report. All rights reserved.
        </footer>
      </div>
    </div>
  );
}