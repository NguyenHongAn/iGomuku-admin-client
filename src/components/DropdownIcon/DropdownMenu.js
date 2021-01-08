import './DropdownIcon.css';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                ...
            </a>
        );
    }

    return (
        <div className="dropdown">

            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit>

                <div className="menu">
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem
                        goToMenu="settings">
                        Settings
            </DropdownItem>

                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit>

                <div className="menu">
                    <DropdownItem goToMenu="main" >
                        <h2>Go back</h2>
                    </DropdownItem>
                </div>

            </CSSTransition>

        </div>
    );
}

export default DropdownMenu;