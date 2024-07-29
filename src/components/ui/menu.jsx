import React, { useState } from 'react';

const Menu = ({ mainComponent, menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative inline-block text-left" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <div>
        <button
          onClick={toggleMenu}
          className="inline-flex justify-center w-full rounded-md text-sm font-medium text-gray-700"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {mainComponent}
        </button>
      </div>

      {isMenuOpen && (
        <div className='origin-top-right absolute right-0 top-[-10px]'>
          <div
            className=" mt-12 w-56 rounded-md border  bg-white border-gray-300  ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <div className="py-1" role="none">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsMenuOpen(false);
                    item.onClick && item.onClick();
                  }}
                  className="block w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  role="menuitem"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
