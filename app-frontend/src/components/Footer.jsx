function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Social Media and Links */}
        <div className="space-x-6 mb-4">
          <a href="https://twitter.com" className="hover:text-red-600">Twitter</a>
          <a href="https://facebook.com" className="hover:text-red-600">Facebook</a>
          <a href="https://instagram.com" className="hover:text-red-600">Instagram</a>
        </div>

        {/* Copyright */}
        <p className="text-sm">
          © 2025 Mission Fitness. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
