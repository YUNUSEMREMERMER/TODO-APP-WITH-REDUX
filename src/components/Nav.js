import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, removeUserAsync } from "../redux/user/userSlice"



function Nav() {

    const dispatch = useDispatch();
    const user = useSelector(userSelector)
    console.log(user)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        console.log(user.id)
        dispatch(removeUserAsync(user.id))
        setAnchorEl(null);
    };
    return (
        <div className='navigation'>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {user.firstName}< ArrowDropDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Hesabı Sil</MenuItem>
                
            </Menu>
        </div>
    )
}

export default Nav