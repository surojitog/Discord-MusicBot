import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsGithub } from 'react-icons/bs';

import { API_URL, DISCORD_CDN, GITHUB, INVITE_LINK, SUPPORT_SERVER } from '../../utils/constants.js';
import mainContext from '../../contexts/mainContext.jsx';
import './Navbar.scss';

const Navbar = () => {
    const [active, setActive] = useState(false);
    const { user, bot } = useContext(mainContext);

    const Login = () => {
        const [userOptions, setUserOptions] = useState(false);

        const userStyle = {
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 25px'
        };

        const imgStyle = {
            borderRadius: '50%',
            height: '2rem'
        };

        const iconStyle = {
            color: 'white',
            padding: '3px',
            margin: '5px',
            cursor: 'pointer',
            transform: userOptions ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'all .2s ease-in-out'
        };

        const userOptionsStyle = {
            position: 'absolute',
            float: 'right',
            top: '75px',
            // width: '150px',
            backgroundColor: 'var(--dark-grey)',
            borderRadius: '3px',
            zIndex: '5',
            boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.3)'
        };

        const userOptionsStyleChild = {
            display: 'flex',
            rowDirection: 'column',
            margin: '10px 15px'
        };

        return (
            <>
                <div className='profile' style={userStyle}>
                    {user ? (<>
                        <img style={imgStyle} src={`${DISCORD_CDN}/avatars/${user?.id}/${user?.avatar}.png`} alt="Logo" />
                        <MdOutlineKeyboardArrowDown style={iconStyle} onClick={() => setUserOptions(!userOptions)} />
                    </>) : (<a className='login' href={API_URL + '/api/auth/discord'}>Login</a>)
                    }
                    {userOptions &&
                        <div style={userOptionsStyle} className="userOptions">
                            <p style={{ ...userOptionsStyleChild, color: 'var(--grey)' }}>{user?.username + '#' + user?.discriminator}</p>
                            <NavLink style={userOptionsStyleChild} to='/profile'>Profile</NavLink>
                            <a style={userOptionsStyleChild} className='logout' href={API_URL + '/api/auth/logout'}>Logout</a>
                        </div>
                    }
                </div >
            </>
        );
    };

    const Pages = () => {
        return (
            <>
                <div className="pages">
                    <NavLink onClick={() => setActive(!active)} to='/'>Home</NavLink>
                    <NavLink onClick={() => setActive(!active)} to='/commands'>Commands</NavLink>
                    <NavLink onClick={() => setActive(!active)} to='/dashboard'>Dashboard</NavLink>
                    <a onClick={() => setActive(!active)} target='_blank' rel="noopener noreferrer" href={SUPPORT_SERVER}>Support Server</a>
                    <a onClick={() => setActive(!active)} className='invite' target='_blank' rel="noopener noreferrer" href={INVITE_LINK}>Invite Bot</a>
                    <a className='github' onClick={() => setActive(!active)} target='_blank' rel="noopener noreferrer" href={GITHUB}><BsGithub /></a>
                    <Login />
                </div>
            </>
        );
    };

    return (
        <>
            <div className='navbar'>
                <div className="logo">
                    <Link to='/'>{bot.username}</Link>
                </div>
                <div className={active ? 'menu active-menu' : 'menu'}>
                    <Login />
                    <div className='menu-btn' style={{marginBottom: '1px'}} onClick={() => setActive(!active)}></div>
                </div>

                <Pages />

            </div>
            {active && (
                <div className='responsive'>
                    <Pages />
                </div>
            )}
        </>
    );
};

export default Navbar;