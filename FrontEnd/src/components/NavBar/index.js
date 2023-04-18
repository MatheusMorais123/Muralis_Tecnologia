import React from 'react';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,  faEnvelope } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    const nome = localStorage.getItem('nome'); 
    return (
        <>
            <div className="sidebar">
                <img className="profile-pic" src="https://via.placeholder.com/150" alt="Profile picture" />
                <div className="user-info">
                    <p>{nome}</p>
                    <br />
                    <p>matheus-morais02@hotmail.com</p>
                </div>
                <ul className="menu">
                    <li>
                        <a href="#">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>Ingressantes</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}
