"use client";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white border-t border-amber-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-500/5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-black bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 bg-clip-text text-transparent mb-4 tracking-wide">外壁塗装の窓口</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-400 text-sm tracking-wider">
            © 2025 外壁塗装の窓口. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;