
const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-mem-gray">
      <div className="mem-container text-center">
        <p className="text-mem-darkGray">
          © {new Date().getFullYear()} Memphis Earth Movers | 
          <a href="#" className="text-mem-blue ml-1 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
