import { useDispatch } from "react-redux";

//thunk import
import { login } from "../../store/session";

const DemoUser = () => {
  const dispatch = useDispatch();

  const loginDemo= () => {
    dispatch(login({ credential: "demo_user", password: "harrypotter" }));
  };

  return (
    <>
      <button onClick={loginDemo}>Demo</button>
    </>
  );
};

export default DemoUser;
