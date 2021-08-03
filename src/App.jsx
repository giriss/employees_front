import { useEffect, useRef } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useSelector } from 'react-redux';
import Homepage from './components/Homepage';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import EmployeesDashboard from "./components/EmployeesDashboard";
import { selectLoading } from './reducers/loadingSlice';

function App() {
  const loadingRef = useRef();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (isLoading === true) {
      loadingRef.current.continuousStart();
    } else if (isLoading === false) {
      loadingRef.current.complete();
    }
  }, [isLoading]);

  return (
    <>
      <LoadingBar color="#2185d0" ref={loadingRef} />
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route>
              <Segment stacked>
                <Switch>
                  <Route exact path="/sign-in" component={SignInForm} />
                  <Route exact path="/sign-up" component={SignUpForm} />
                  <Route path="/employees" component={EmployeesDashboard} />
                  <Route>404 - Not found</Route>
                </Switch>
              </Segment>
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
