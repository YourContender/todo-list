import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import './Header.scss'; 

const Header = ({ changeTheme, setChangeTheme }) => {
    const dayOrNightClass = changeTheme ? 'header_day' : 'header';

    return (
        <div className={dayOrNightClass}>
            <div className="header_container">
                <div>
                    <h2>TODO-list</h2>
                    <span>Sergey Sayenko</span>
                </div>
            
                <div className="header_theme">
                    <button onClick={() => setChangeTheme(!changeTheme)}>
                        {changeTheme ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun}/>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;