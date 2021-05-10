import React, {useState, useEffect} from 'react'
import NavBar from '../shared/NavBar'
import axios from 'axios'
import {InputGroup, FormControl, Modal, Button, Card, Container, Row, Col} from 'react-bootstrap'
import {login, logout, checkLoggedIn, register} from '../global/Reducer'

function HomePage(){
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false)
    const [imgs, setImgs] = useState([['https://i.postimg.cc/CK68zSZ7/firefox-2018-07-10-07-50-11.png', 1], 
    ["https://i.postimg.cc/T1bgzF39/opt-aboutcom-coeus-resources-content-migration-serious-eats-seriouseats-com-2015-07-20210.jpg", 2],
    ['https://i.postimg.cc/dtmTG8kL/SONATA-hero-option1-764-A5360-edit.jpg', 3],
     ['https://i.postimg.cc/dtKy7W0b/types-of-homes-hero.jpg', 4],
     ['https://i.postimg.cc/L89gDnLv/acela-1080.jpg', 5]])

    const [loginEvent, setLoginEvent] = useState({
        username: "",
        password: ""
    })

    const [searchInput, setSearchInput] = useState({
        image: ""
    }) 

    const loginChangeHandler = (event) => {
        setLoginEvent({
            ...loginEvent, 
            [event.target.name]: event.target.value
        })
    }
    const searchChangeHandler = (event) => {
        setSearchInput({
            ...searchInput,
            [event.target.name]: event.target.value
        })
    }
    const searchButtonHandler = () => {
        let obj = {
            "image": ""
        }

        let query = ""
        
        for (var key in obj){
            if (obj[key] !== "")  query += key + "=" + obj[key] + '&'
        }
        query = query.slice(0, query.length-1)
        window.location = "/searchResults?" + query
    }

    const loginButtonHandler = () => login(loginEvent, '/')

    const [registerEvent, setRegisterEvent] = useState({
        username: "", 
        password: ""
    })

    const registerChangeHandler = (event) => {
        setRegisterEvent({
            ...registerEvent,
            [event.target.name]: event.target.value
        })
    }

    const registerButtonHandler = () => register(registerEvent, '/')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    let loggedIn = false
    if (checkLoggedIn()) loggedIn = true

    const purchaseHandler = (event) => {
        const ID = event.target.id
        var imgUrl = ""
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i][1] == ID) {
                imgUrl = imgs[i][0]
                break
            }
        }
        window.location = '/purchase/'+(ID * 1.5)+'/'+JSON.parse(localStorage.getItem('userObj')).username
    }

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
            
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>Username</label>
                        <br/>
                        <input type="text" name="username" placeholder="Username" onChange={loginChangeHandler} autocomplete="chrome-off" required/>
                        <br/>
                        <br/>
                        <label>Password</label>
                        <br/>
                        <input type="password" name="password" placeholder="Password" onChange={loginChangeHandler} autocomplete="chrome-off" required/>
                        <br /><br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={loginButtonHandler}>
                    Sign In
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>Username</label>
                        <br/>
                        <input name="username" placeholder="Username" onChange={registerChangeHandler} required/>
                        <br/>
                        <br/>
                        <label>Password</label>
                        <br/>
                        <input type="password" name="password" placeholder="Password" onChange={registerChangeHandler} required/>
                        <br /><br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    Close
                </Button>
                <Button variant="primary" onClick={registerButtonHandler}>
                    Sign Up
                </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <h1 style={{color: 'black'}}>Select an image to purchase!</h1>
                {imgs.map(image => {
                    return (
                        <div>
                            <Card style={{boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)', width:'50%', marginLeft: 'auto', marginRight: 'auto'}}>
                                <Card.Img src={image[0]}></Card.Img>
                                <Button id={image[1]} onClick={purchaseHandler}>Purchase for {image[1] * 1.5}</Button>
                            </Card>
                            <br></br>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default HomePage