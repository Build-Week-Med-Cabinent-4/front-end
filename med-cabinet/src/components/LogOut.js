import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logOut } from '../actions/actions'

const LogOut = (props) => {
    const { push } = useHistory()
    
    useEffect(() => {
        props.logOut()
        push('/')
    }, [])
    return(
        <></>
    )
}

export default connect(null, { logOut })(LogOut)