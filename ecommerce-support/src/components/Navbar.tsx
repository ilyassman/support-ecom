import {ShoppingBag,Search,User} from 'lucide-react';
import './Navbar.css';

const Navbar=() => {
    return (
        <>
            <div className="top-bar">
                Free Shipping For USA & Canada Over $30
            </div>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <a href="#" className="nav-link">SHOP</a>
                        <a href="#" className="nav-link">HAIR TOOLS</a>
                        <a href="#" className="nav-link">HAIR CARE</a>
                    </div>

                    <div className="navbar-center">
                        <div className="logo">HOUSE OF HAIR</div>
                    </div>

                    <div className="navbar-right">
                        <div className="nav-icon-link">
                            <span>SEARCH</span>
                            <Search className="icon" size={18} />
                        </div>
                        <div className="nav-icon-link">
                            <span>ACCOUNT</span>
                            <User className="icon" size={18} />
                        </div>
                        <div className="nav-icon-link">
                            <span>BAG (0)</span>
                            <ShoppingBag className="icon" size={18} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
