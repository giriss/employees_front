import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Card, Image, Label, Modal } from "semantic-ui-react";
import { PICTURE_BASE_URL } from "../../app/constants";
import { deleteEmployee } from "../../reducers/employeesSlice";
import { selectToken } from "../../reducers/tokenSlice";

function EmployeeCard({ employee }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  const confirmRemove = useCallback(() => setIsDeleting(true), []);
  const editEmployee = useCallback(() => history.push(`/employees/${employee.id}`), [employee, history]);

  return (
    <>
      <EmployeeDeleteModal
        employee={employee}
        open={isDeleting}
        onCancel={_ => setIsDeleting(false)}
      />
      <Card raised>
        <Card.Content>
          {employee.pictureId && (
            <Image
              floated="right"
              size="mini"
              circular
              src={`${PICTURE_BASE_URL}/${employee.pictureId}`}
            />
          )}
          <Card.Header>{employee.firstName} {employee.lastName}</Card.Header>
          <Card.Meta>{employee.email}</Card.Meta>
          <Card.Description>
            {employee.firstName} {employee.lastName} ({employee.email}) was born on {employee.dob}.
            <br />
            <br />
            <Label color={employee.permanent ? 'green' : 'red'}>
            {employee.permanent ? 'PERMANENT' : 'NON-PERMANENT'}
            </Label>
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="right">
          <Button basic color="red" onClick={confirmRemove}>
            Delete
          </Button>
          <Button basic color="green" onClick={editEmployee}>
            Edit
          </Button>
        </Card.Content>
      </Card>
    </>
  );
}

function EmployeeDeleteModal({ employee, open, onCancel }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const remove = useCallback(async () => {
    await dispatch(deleteEmployee({ employee, token }));
  }, [dispatch, employee, token]);

  return (
    <Modal
      basic
      open={open}
      header="Confirm delete?"
      content={`Are you sure to delete employee ${employee.firstName} ${employee.lastName}?`}
      actions={[
        <Button
          basic
          inverted
          key="0"
          onClick={onCancel}
        >
          Cancel
        </Button>,
        <Button
          inverted
          key="1"
          color="red"
          onClick={remove}
        >
          Delete
        </Button>,
      ]}
    />
  );
}

export default EmployeeCard;
