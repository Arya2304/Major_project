const Footer = () => {
  return (
    <footer className="bg-dark-500 text-white mt-16 py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-3 text-primary-300">SignLearn</h3>
            <p className="text-gray-300">Learn sign language through interactive videos and courses</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-lg font-bold mb-3 text-primary-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/signs" className="text-gray-300 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300 rounded px-2 py-1 transition-colors">Learn Signs</a></li>
              <li><a href="/courses" className="text-gray-300 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300 rounded px-2 py-1 transition-colors">Courses</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300 rounded px-2 py-1 transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="text-lg font-bold mb-3 text-primary-300">Support</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300 rounded px-2 py-1 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-300 rounded px-2 py-1 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-400 pt-6 text-center text-gray-400">
          <p>&copy; 2024 SignLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

