import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getEntities,
  entityList,
} from "../../features/UserManagement/userManagementSlice";

export default function Entities() {
  const [isMount, setIsMount] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(entityList);
  console.log(data);

  useEffect(() => {
    if (isMount) {
      console.log("inside the use effect");
      setIsMount(false);
      dispatch(getEntities());
    }
  }, [dispatch, isMount]);

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.firstname} {item.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}
