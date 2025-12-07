import Search from "./Search";
import logoimg from "../assets/MainPage/images.png"
import settinglogo from "../assets/MainPage/images (1).png"

function Header(z) {
    return (
        <div className="header-container">
            <header>
                <nav className="nav-design">
                    <img className="logo-icon" src={logoimg}></img>
                    <img className="setting-icon" src={settinglogo} ></img>
                    <Search />
                </nav>
                <h1>Find <span>Movies</span> You'll Enjoy Without The hassle</h1>
            </header>
            
        </div>
    )
}
export default Header; 