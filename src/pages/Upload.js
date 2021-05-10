import React, {useState} from 'react'
import NavBar from '../shared/NavBar'
import {checkLoggedIn, logout} from '../global/Reducer'
import axios from 'axios'
import { Button } from 'react-bootstrap';

function Upload() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false)
    const [file, setFile] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const imageHandler = (event) => setFile(event.target.files[0])
    

    const uploadBtnHandler = () => {
        let obj = {
            filename: file.name,
            fileType: file.type
        }
        axios.post('http://localhost:4000/api/upload', obj).then(response => {

        })
    }

    let loggedIn = false
    if (checkLoggedIn()) loggedIn = true

    return (
        <React.Fragment>    
            {loggedIn ? <NavBar 
                nav={[['/profile', 'My Profile'], ['/upload', 'Upload an image']]} 
                accountManagement={[handleShow, handleShow2]}
                loggedIn = {loggedIn}
                logOut = {logout}
                logoPath='/'
            />
            :
            <NavBar 
                nav={[]} 
                accountManagement={[handleShow, handleShow2]}
                loggedIn = {loggedIn}
                logOut = {logout}
                logoPath='/'
            />
            }
            
            <div>
                <form>
                    <input type="file" name="img" onChange={imageHandler}/>
                </form>
                <Button onClick={uploadBtnHandler}>Upload!</Button>

            </div>
        </React.Fragment>
    )
}

export default Upload