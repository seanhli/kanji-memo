import { NavLink } from "react-router-dom"

function SideMenu() {
    return (
        <div className="side-menu">
            <div className="menu">
                <div className="menu-title">
                    modes
                </div>
                <NavLink
                    to={'/home/challenge/'}
                    className={({isActive}) => (isActive ? 'nav-link-active':'nav-link')}>
                    challenge
                </NavLink>
                <NavLink
                    to={'/home/recognition/'}
                    className={({isActive}) => (isActive ? 'nav-link-active':'nav-link')}>
                    recognition
                </NavLink>
                <NavLink
                    to={'/home/comprehension/'}
                    className={({isActive}) => (isActive ? 'nav-link-active':'nav-link')}>
                    comprehension
                </NavLink>
                <NavLink
                    to={'/home/pairings/'}
                    className={({isActive}) => (isActive ? 'nav-link-active':'nav-link')}>
                    pairings
                </NavLink>
            </div>
            <div className="menu">
                <div className="menu-title">
                    difficulty
                </div>
                <div className="menu-item">
                    beginner
                </div>
                <div className="menu-item">
                    intermediate
                </div>
                <div className="menu-item">
                    advanced
                </div>
            </div>
        </div>
    )
}

export default SideMenu
