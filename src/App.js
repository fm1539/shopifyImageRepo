import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Upload from './pages/Upload'
import CheckoutForm from './pages/Purchase'

function App() {
  return (
      <Router>
        <Switch>

          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/upload' exact>
            {JSON.parse(localStorage.getItem('userObj')) ? 
              <Upload /> :
              <Redirect to='/' />
            }
          </Route>
          <Route path='/purchase/:price/:username' exact>
            {JSON.parse(localStorage.getItem('userObj')) ? 
              <CheckoutForm /> :
              <Redirect to='/' />  
          }
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
