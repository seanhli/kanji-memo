import { Outlet } from "react-router-dom"

function MainDisplay() {
    return (
        <div className="main-display">
            <Outlet/>
        </div>
    )
}

export default MainDisplay
