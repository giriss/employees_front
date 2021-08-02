import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon } from "semantic-ui-react";

function SignUp() {
  return (
    <Grid.Column>
      <Header icon>
        <Icon name='add user' />
        Are you new here?
      </Header>
      <Button
        primary
        as={Link}
        to="/sign-up"
      >
        Sign up
      </Button>
    </Grid.Column>
  );
}

export default SignUp;
