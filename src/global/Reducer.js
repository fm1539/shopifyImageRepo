import axios from 'axios'

async function login(userObj, path) {
    await axios.post('http://localhost:4000/api/login', userObj).then(response => {
        if (Object.keys(response.data.userObj).length === 0) {
            alert("User has not been found with provided credentials. Please try again")
        }
        else {
            localStorage.setItem('userObj', JSON.stringify({'username': response.data.userObj.Item.username}))
            window.location = path
        }
    })
}

async function register(registerEvent, path) {
    await axios.post('http://localhost:4000/api/register', registerEvent).then( response => {
            if (response.data.status === "registered") window.location = path
            else alert('Username or Email already exists, or there was a problem while registering')
        }
    )
}

const checkLoggedIn = () => {
    if (JSON.parse(localStorage.getItem('userObj')) === null){
        return false
    }
    else{
        return true
    }
}

const logout = () => {
    localStorage.removeItem('userObj')
    window.location = '/'
}


export {login, logout, checkLoggedIn, register}

