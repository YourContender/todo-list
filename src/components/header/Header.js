import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.scss'; 

const Header = () => {
    return (
        <div className="header">
            <div className="header_container">
                <div>
                    <h2>TODO-list</h2>
                    <span>Sergey Sayenko</span>
                </div>
            
                <div className="header_theme">
                    <button>
                        <FontAwesomeIcon icon={faSun}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;