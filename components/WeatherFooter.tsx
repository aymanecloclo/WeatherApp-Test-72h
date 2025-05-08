'use client';

import { FaGithub, FaLinkedin, FaCloudSun, FaHeart } from 'react-icons/fa';

export default function WeatherFooter() {
    return (
        <footer className="  w-full mt-10 bg-gradient-to-r from-blue-800/50 to-indigo-900/50 backdrop-blur-md border-t border-white/20 text-white rounded-t-2xl shadow-inner">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
                {/* Logo & Title */}
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <FaCloudSun className="text-yellow-300 text-2xl animate-pulse" />
                    <span className="text-xl font-semibold tracking-wide">AY.weather</span>
                </div>

        
                {/* Social Media */}
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/aymanecloclo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/aymane-rachid-106700317/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition"
                    >
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Signature */}
            <div className="text-center text-white/50 text-xs py-4 border-t border-white/10">
                Fait avec <FaHeart className="inline mx-1 text-red-400 animate-bounce" /> par <span className="font-semibold text-white/70">Aymane RACHID</span> © {new Date().getFullYear()}
            </div>
        </footer>
    );
}
