import { IoIosNotifications } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useUsers } from "../../context/UsersContext";
export default function Nav() {
  const { user } = useUsers();
  return (
    <nav>
      <span>
        <IoIosNotifications />
      </span>
      <span>
        <MdEmail />
      </span>
      <span className="separator"></span>
      <span>{user.username}</span>
      <img
        style={{ width: "25px", height: "25px", borderRadius: "50%" }}
        src={user.image}
        alt="user photo"
      />
    </nav>
  );
}
