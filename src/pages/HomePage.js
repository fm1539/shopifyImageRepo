import React, {useState, useEffect} from 'react'
import NavBar from '../shared/NavBar'
import axios from 'axios'
import {InputGroup, FormControl, Modal, Button, Card, Container, Row, Col} from 'react-bootstrap'
import {login, logout, checkLoggedIn, register} from '../global/Reducer'

function HomePage(){
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false)

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

    return (
        <React.Fragment>
            {loggedIn ? <NavBar 
                nav={[['/profile', 'My Profile']]} 
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
                        <label>Email</label>
                        <br/>
                        <input type="email" name="email" placeholder="Email" onChange={loginChangeHandler} autocomplete="chrome-off" required/>
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
            <div className="search-flights-div">
                <h1 style={{color: 'white'}}>Search for User!</h1>
            <Card style={{boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)', width:'50%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Card.Body>
                        <Card.Title style={{'textAlign': 'left'}}>Search User</Card.Title>
                        <div style={{'display': 'flex'}}>
                            <InputGroup className="mb-3" style={{'width': '50%'}}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">User</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                placeholder=""
                                aria-label="Username"
                                name="leaving"
                                onChange={searchChangeHandler}
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <br/><br/>
                        <Button onClick={searchButtonHandler}>Search</Button>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default HomePage