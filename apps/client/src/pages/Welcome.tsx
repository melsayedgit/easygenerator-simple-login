import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../lib/axios";
import { Button, Typography } from "@mui/material";
interface IUser {
  email: string;
  profile: {
    name: string;
    bio: string;
  };
}
const Welcome: FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { token, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
    getUserInfo();
  }, [token]);
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${originalTitle} - Welcome`;
    return () => {
      document.title = originalTitle;
    };
  }, []);
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/my-details/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="form-card">
        <img
          style={{ width: "10rem" }}
          src="/eg-icon.png"
          alt="Logo"
          className="form-logo"
        />

        <h2>Welcome to Easygenerator</h2>

        <Typography sx={{ margin: "5px" }} color="warning" variant="body1">
          {user?.profile.name}
        </Typography>

        <Typography sx={{ margin: "2px" }} color="primary" variant="body1">
          {user?.email}
        </Typography>

        <Typography
          sx={{ margin: "2px" }}
          fontSize={"0.8rem"}
          color="info"
          variant="body1"
        >
          {user?.profile.bio}
        </Typography>
        <Button
          onClick={() => signOut()}
          variant="contained"
          fullWidth
          sx={{
            background: "radial-gradient(circle, #E94E77, #F7A440)",
            color: "white",
            "&:hover": {
              background: "radial-gradient(circle, #D63C65, #E89430)",
            },
            marginTop: "10px",
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
export default Welcome;
