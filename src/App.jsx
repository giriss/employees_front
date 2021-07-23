import { Container, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

function App() {
  return (
    <Router>
      <Container text>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route>
            <Segment stacked>
              <Switch>
                <Route exact path="/sign-in" component={SignInForm} />
                <Route exact path="/sign-up" component={SignUpForm} />
                <Route>404 - Not found</Route>
              </Switch>
            </Segment>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
