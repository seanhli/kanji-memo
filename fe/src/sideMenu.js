import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { toggleMenu, changeLevel } from "./store/menu/menuUI";

function SideMenu() {
    const menuState = useSelector(state => state.menuSlice)
    const dispatch = useDispatch();

    return (
        <div className="side-menu">
            <div className="menu">
                <div className="menu-title"
                    onClick={e=>{dispatch(toggleMenu('modes'))}}>
                    modes
                </div>
                <div className="menu-widget">
                    {!menuState.modes &&
                    <img src={require(`./assets/open.png`)} alt="open button"/>}
                    {menuState.modes &&
                    <img src={require(`./assets/close.png`)} alt="close button"/>}
                </div>
                {menuState.modes &&
                <>
                    <NavLink
                        to={'/home/challenge/'}
                        className={({isActive}) => (isActive ? 'nav-link active':'nav-link')}>
                        challenge
                    </NavLink>
                    <NavLink
                        to={'/home/recognition/'}
                        className={({isActive}) => (isActive ? 'nav-link active':'nav-link')}>
                        recognition
                    </NavLink>
                    <NavLink
                        to={'/home/comprehension/'}
                        className={({isActive}) => (isActive ? 'nav-link active':'nav-link')}>
                        comprehension
                    </NavLink>
                    <NavLink
                        to={'/home/pairings/'}
                        className={({isActive}) => (isActive ? 'nav-link active':'nav-link')}>
                        pairings
                    </NavLink>
                </>}
            </div>
            <div className="menu">
                <div className="menu-title"
                    onClick={e=>{dispatch(toggleMenu('difficulty'))}}>
                    difficulty
                </div>
                <div className="menu-widget">
                    {!menuState.difficulty &&
                    <img src={require(`./assets/open.png`)} alt="open button"/>}
                    {menuState.difficulty &&
                    <img src={require(`./assets/close.png`)} alt="close button"/>}
                </div>
                {menuState.difficulty &&
                <>
                    <div className={menuState.level === 1 ? "menu-item active" : "menu-item"}
                        onClick={e=>{dispatch(changeLevel(1))}}>
                        beginner
                    </div>
                    <div className={menuState.level === 2 ? "menu-item active" : "menu-item"}
                        onClick={e=>{dispatch(changeLevel(2))}}>
                        intermediate
                    </div>
                    <div className={menuState.level === 3 ? "menu-item active" : "menu-item"}
                        onClick={e=>{dispatch(changeLevel(3))}}>
                        advanced
                    </div>
                </>}
            </div>
        </div>
    )
}

export default SideMenu
