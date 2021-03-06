import axios from "axios";

const user_service = {
  registration: ({ signUpInfo }) =>
    axios.post("/api/users", { user: signUpInfo }),
  authentication: ({ signInInfo }) =>
    axios.post("/api/users/login", { user: signInInfo }),
  getCurrentUser: () => axios.get("/api/user"),
  updateUser: ({ userInfo }) => axios.put("/api/user", { user: userInfo }),
};

export default user_service;
