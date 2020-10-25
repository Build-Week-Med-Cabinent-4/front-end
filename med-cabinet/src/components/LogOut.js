import React, { useEffect } from 'react'
import { logOut } from '../actions/actions'
import { Link, useHistory } from "react-router-dom"

const LogOut = () => {
    const history = useHistory();
    const goHome = () => {
        history.push("/")
        window.location.reload()
    }
    return(
        <div>
            <h2>Thanks For Visiting us!</h2>
            <h3> To go back to our landing page click here:</h3>
            <a href = "https://medcabinent.netlify.app/">Landing Page</a>
            <h4> Wanna Log back in? Click here:</h4>
            <Link onClick = {() => (goHome())} to = "/" > Home </Link>
        </div>
    )
}

export default LogOut;