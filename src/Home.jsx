import React from "react";
import { useNavigate } from "react-router-dom";
import Lorkru from "./assets/public/lorkru.png";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();

  const projectData = {
    university: "ROYAL UNIVERSITY OF PHNOM PENH",
    department: "DEPARTMENT OF INFORMATION TECHNOLOGY AND ENGINEERING",
    projectTitle: "ENCRYPTION AND DECRYPTION DEMO",
    logo: "https://www.rupp.edu.kh/logo/rupp_logo.png",
    advisor: {
      name: "Mr. LIM Seyha",
      role: "Mathematics Lecturer",
      date: "February 22, 2026",
      img: Lorkru,
    },
    members: [
      { name: "Mr. Voeurn Davith", id: "ID: 000065012" },
      { name: "Mr. Hout Sophanit", id: "ID: 000066789" },
      { name: "Ms. Chea Lyna", id: "ID: 000067123" },
      { name: "Ms. Srey Manich", id: "ID: 000068456" },
      { name: "Ms. Bo Leakena", id: "ID: 000069789" },
      { name: "Ms. Veng Punlork", id: "ID: 000070321" },
      { name: "Mr. Hour Panhasal", id: "ID: 000071654" },
      { name: "Mr. Heng Ordom", id: "ID: 000072987" },
    ],
    description:
      "This demonstration presents applications of number theory, including classical encryption methods and the RSA algorithm.",
  };

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50 font-sans">

      {/* Header */}
      <header className="text-center py-12 px-6">
        <img
          src={projectData.logo}
          alt="University Logo"
          className="w-24 h-24 mx-auto mb-4 object-contain"
        />
        <h2 className="text-lg font-bold tracking-widest uppercase text-slate-700 project-title">
          {projectData.university}
        </h2>
        <p className="text-xs text-slate-500 tracking-widest uppercase mt-1 project-title">
          {projectData.department}
        </p>

        <h1 className="text-3xl md:text-4xl mt-6 font-extrabold text-slate-900 project-title">
          {projectData.projectTitle}
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* Top Row */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Advisor Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <h3 className="text-xs uppercase font-semibold text-slate-400 mb-6 tracking-wider project-title">
              Project Advisor
            </h3>
            <img
              src={projectData.advisor.img}
              alt="Advisor"
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-blue-50"
            />
            <p className="font-bold text-lg text-slate-800 project-title">
              {projectData.advisor.name}
            </p>
            <p className="text-sm text-slate-500">{projectData.advisor.role}</p>
            <p className="text-xs font-medium text-blue-500 mt-2 bg-blue-50 px-3 py-1 rounded-full">
              {projectData.advisor.date}
            </p>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-center">
            <h3 className="text-xs uppercase font-semibold text-slate-400 mb-4 tracking-wider text-center md:text-left project-title">
              Project Overview
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg italic text-center md:text-left">
              "{projectData.description}"
            </p>

            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <button
                onClick={() => navigate("/history")}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                View Demo
              </button>

              <button
                onClick={() => navigate("/info")}
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg shadow-green-100"
              >
                View Cryptography Report
              </button>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div id="team" className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xs uppercase font-semibold text-slate-400 mb-8 tracking-wider text-center project-title">
            Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectData.members.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md border border-slate-50 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <p className="text-sm font-bold text-slate-800 text-center leading-tight mb-2 project-title">
                  {m.name}
                </p>
                <p className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
                  {m.id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-12 project-title">
        <div className="w-16 h-px bg-slate-200 mx-auto mb-4"></div>
        © {new Date().getFullYear()} {projectData.university}
        <br />
        <span className="mt-1 block">All Rights Reserved</span>
      </footer>
    </div>
  );
};

export default Home;