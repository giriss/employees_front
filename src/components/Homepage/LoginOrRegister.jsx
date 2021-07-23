import { Divider, Grid, Segment } from "semantic-ui-react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function LoginOrRegister() {
  return (
    <Segment stacked placeholder>
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign='middle'>
          <SignIn />
          <SignUp />
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default LoginOrRegister;
