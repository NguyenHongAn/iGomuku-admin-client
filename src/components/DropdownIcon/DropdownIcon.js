import './DropdownIcon.css';
import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';


function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>
            {open ? (
                <DropdownMenu></DropdownMenu>) : (<p></p>)}
            {open && props.children}
        </li>
    );
};



export default NavItem;