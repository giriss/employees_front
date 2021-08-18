import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";

function EmployeeSearch({ onChange }) {
  const history = useHistory();
  const query = useMemo(
    () => decodeURIComponent(history.location.search.replace('?q=', '')),
    [history.location.search]
  );
  const searchByName = useCallback((_, elem) => {
    history.push({
      pathname: '/employees',
      search: elem.value === '' ? undefined : `?q=${encodeURIComponent(elem.value)}`,
    });
  }, [history]);

  useEffect(() => {
    if (query === '') {
      return onChange([]);
    }
    onChange(query.split(' '));
  }, [onChange, query]);

  return (
    <Input
      icon="search"
      value={query}
      placeholder="Search by name"
      onChange={searchByName}
    />
  );
}

export default EmployeeSearch;
