import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            {`© ${new Date().getFullYear()}. Nikita`}
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-gray-100 transition duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
