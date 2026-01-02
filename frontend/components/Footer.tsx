'use client';

import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Eye } from 'lucide-react';

const Footer: React.FC = () => {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => { if (data.success) setVisits(data.visits); })
      .catch(() => {});
  }, []);

  const socialLinks = [
    { href: "https://github.com/kushwith03", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/kushwith03", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:kushwith03@gmail.com", icon: Mail, label: "Email" }
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">R Khushwith Kumar</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Crafting scalable digital experiences with precision and passion.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary dark:hover:text-white transition-colors transform hover:-translate-y-1"
                aria-label={link.label}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 dark:border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} R Khushwith Kumar. All rights reserved.</p>
          
          {visits !== null && (
            <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800">
              <Eye className="h-3 w-3" />
              <span className="font-mono text-xs">{visits.toLocaleString()} views</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;