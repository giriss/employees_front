import { Card } from "semantic-ui-react";
import EmployeeCard from "./EmployeeCard";

export function EmployeesList({ items }) {
  return (
    <Card.Group stackable itemsPerRow={3}>
      {items.map(
        employee => <EmployeeCard employee={employee} key={employee.id} />
      )}
    </Card.Group>
  );
}
