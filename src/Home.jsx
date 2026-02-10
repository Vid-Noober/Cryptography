import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure Playwright NO is imported here

const Home = () => {
  const navigate = useNavigate(); // Navigation hook

  const projectData = {
    university: "ROYAL UNIVERSITY OF PHNOM PENH",
    department: "DEPARTMENT OF INFORMATION TECHNOLOGY AND ENGINEERING",
    projectTitle: "ENCRYPTION AND DECRYPTION DEMO",
    logo: "https://www.rupp.edu.kh/logo/rupp_logo.png",
    advisor: {
      name: "Mr. LIM Seyha",
      role: "Mathematics Lecturer",
      date: "February 22, 2026",
      img: "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/476806530_2528440944012428_58655262053192815_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHF8YwkidrtYscFoSUh3t7siMJfufmIPn-Iwl-5-Yg-f0GiS_1SMeWNG8Q7EVHjIcplI09oY2Gano2iR49V6xFm&_nc_ohc=P_kgZhXWv48Q7kNvwE7pMX5&_nc_oc=AdkAUUNoqff8rlzXA6w6zSevRLThYGuXqu2wez3dTKYpzArxfzF70ZMQoXnVuecaxNc&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=I4k3QBk4LzpclgCExcizpQ&oh=00_AfsdHVUmuL2xbXImPJqOkfiXe-sGuWflxrxSlla_x2QtAA&oe=6988F851"
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
      "This demonstration presents applications of number theory, including classic encryption methods and the RSA algorithm."
  };

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50 font-sans">
      
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-center gap-8 text-sm font-medium">
          <a
            onClick={() => navigate("/")}
            className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer"
          >
            Home
          </a>
          <a
            onClick={() => navigate("/history")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Projects
          </a>
          <a
            onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-blue-600 cursor-pointer"
          >
            Team
          </a>
        </div>
      </nav>

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
        
        {/* Top Row: Advisor & Project Description */}
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
            <p className="font-bold text-lg text-slate-800 project-title">{projectData.advisor.name}</p>
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
            <div className="mt-8 flex justify-center md:justify-start gap-4">
              {/* View Demo Button */}
              <button
                onClick={() => navigate("/history")}
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg shadow-green-100"
              >
                View Demo
              </button>
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Team Members */}
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
        © {new Date().getFullYear()} {projectData.university} <br/> 
        <span className="mt-1 block">All Rights Reserved</span>
      </footer>
    </div>
  );
};

export default Home;
