import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { documents } from "../../redux/action/UserManagementAction";

export default function Entities() {
  const data = useSelector((state) => state?.userManagement?.documents);
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("entities component");
    const timeOut = setTimeout(() => dispatch(documents()));
    return () => clearTimeout(timeOut);
  }, [dispatch]);

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
