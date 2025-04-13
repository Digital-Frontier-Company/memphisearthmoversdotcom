
const Footer = () => {
  return (
    <footer className="bg-mem-darkNavy py-6 border-t border-mem-babyBlue/30 glow-container">
      <div className="mem-container text-center">
        <p className="text-white/80">
          © {new Date().getFullYear()} Memphis Earth Movers | 
          <a href="#" className="text-mem-babyBlue ml-1 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
