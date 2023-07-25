import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getEntities,
  entityList,
} from "../../features/UserManagement/userManagementSlice";

export default function Members() {
  const dispatch = useDispatch();
  const data = useSelector(entityList);
  console.log(data);

  // useEffect(() => {
  //   console.log("members component");
  //   const timeOut = setTimeout(() => dispatch(documents()));
  //   return () => clearTimeout(timeOut);
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getEntities());
  }, []);

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
