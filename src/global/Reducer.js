import axios from 'axios'

async function login(custObj, path) {
    const response = await axios.post('http://localhost:8000/api/customer/login', custObj)
    // axios.post('http://localhost:8000/api/customer/login', custObj).then(response => {
    //     console.log(response);
    //     if (response.data.status == "logged"){
    //         console.log(response.data.custObj);
    //         localStorage.setItem('custObj', JSON.stringify(response.data.custObj))
    //     }
    // })
    localStorage.setItem('userObj', JSON.stringify(response.data.custObj))
    window.location = path
}

const register = (registerEvent, path) => {
    axios.post('http://localhost:8000/api/register', registerEvent).then( response => {
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
    localStorage.removeItem('custObj')
    window.location = '/'
}


export {login, logout, checkLoggedIn, register}

