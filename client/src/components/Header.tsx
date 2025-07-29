import { Archive, Instagram, Podcast } from "lucide-react";
import { FaTwitter } from "react-icons/fa";

interface HeaderProps {
  onSubscribeClick: () => void;
}

export default function Header({ onSubscribeClick }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-black z-40 py-6 px-4 border-b border-gray-800">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="text-2xl font-bold text-white hover:opacity-70 transition-opacity"
        >
          Curioustube
        </a>
        
        {/* Social Links & Subscribe */}
        <div className="flex items-center space-x-6">
          {/* Social Media Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/admin" 
              className="text-gray-400 hover:text-white transition-colors" 
              title="Archive"
            >
              <Archive className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/curioustube" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors" 
              title="Twitter"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com/curioustube" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors" 
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors" 
              title="Podcast"
            >
              <Podcast className="w-5 h-5" />
            </a>
          </div>
          
          {/* Subscribe Button */}
          <button 
            onClick={onSubscribeClick}
            className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
}
