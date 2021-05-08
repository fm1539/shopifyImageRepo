import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
      <Router>
        <Switch>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
