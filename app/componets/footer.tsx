import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0b0e37] font-sans pt-12 pb-8 px-12 tracking-wide relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 gap-8 z-20 relative">
            <div>
              <h2 className="text-lg text-gray-300 mb-6">Company</h2>
              <ul className="space-y-5">
                <li><a className="text-gray-400 hover:text-white text-base transition-all">About</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Services</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Contact</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg text-gray-300 mb-6">Products</h2>
              <ul className="space-y-5">
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Featured</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">New Arrivals</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Sale</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg text-gray-300 mb-6">Resources</h2>
              <ul className="space-y-5">
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Documentation</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">FAQ</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Support</a></li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg text-gray-300 mb-6">Connect</h2>
              <ul className="space-y-5">
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Facebook</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Twitter</a></li>
                <li><a className="text-gray-400 hover:text-white text-base transition-all">Instagram</a></li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-600 my-8" />

          <div className="flex justify-center gap-6 relative z-20">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-base transition-all"
            >
              <FaFacebookF className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-base transition-all"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-base transition-all"
            >
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
