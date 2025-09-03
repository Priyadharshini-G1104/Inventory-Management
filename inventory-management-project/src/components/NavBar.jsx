const NavBar = () => {
  return (
    <nav className="relative z-50">
      <div className="glow-navbar w-full py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Left Section - Navigation Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-2 md:mb-0">
              <a href="/" className="px-4 py-2 bg-white text-indigo-900 rounded-full font-semibold hover:bg-indigo-100 transition-all shadow">
                Home
              </a>
              <a href="/cart" className="px-4 py-2 bg-white text-indigo-900 rounded-full font-semibold hover:bg-indigo-100 transition-all shadow">
                Cart
              </a>
              <a href="/inventory" className="px-4 py-2 bg-white text-indigo-900 rounded-full font-semibold hover:bg-indigo-100 transition-all shadow">
                Inventory
              </a>
              <a href="/sales" className="px-4 py-2 bg-white text-indigo-900 rounded-full font-semibold hover:bg-indigo-100 transition-all shadow">
                Sales
              </a>
              <a href="/add-product" className="px-4 py-2 bg-white text-indigo-900 rounded-full font-semibold hover:bg-indigo-100 transition-all shadow">
                Add Product
              </a>
            </div>

            {/* Right Section - Title & Logo */}
            <div className="flex items-center space-x-3">
              <h2 className="text-white text-xl font-bold tracking-wide">
                Inventory Management
              </h2>
              <img
                className="w-[35px] h-[35px] rounded-full border-2 border-white shadow-md"
                src="/cartImage.png"
                alt="LOGO"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
