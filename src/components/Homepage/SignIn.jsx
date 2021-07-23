import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon } from "semantic-ui-react";

function SignIn() {
  return (
    <Grid.Column>
      <Header icon>
        <Icon name='sign in' />
        Already a user?
      </Header>
      <Button
        color="violet"
        as={Link}
        to="/sign-in"
      >
        Sign in
      </Button>
    </Grid.Column>
  );
}

export default SignIn;
