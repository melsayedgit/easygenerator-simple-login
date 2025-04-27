import { useState, FC, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextField, Button, Typography, Link } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn: FC = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${originalTitle} - Sign In`;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const [signInError, setSignInError] = useState<string | null>(null);

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
      navigate("/welcome");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setSignInError(error.message);
      }
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 401:
            setSignInError("Invalid email or password");
            break;
          default:
            setSignInError("Invalid email or password");
            break;
        }
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <img src="/eg-logo.webp" alt="Logo" className="form-logo" />
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          {signInError && (
            <Typography
              sx={{ marginBottom: "10px" }}
              color="error"
              variant="body2"
            >
              {signInError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: "radial-gradient(circle, #E94E77, #F7A440)",
              color: "white",
              "&:hover": {
                background: "radial-gradient(circle, #D63C65, #E89430)",
              },
            }}
          >
            Sign In
          </Button>
        </form>
        <Typography sx={{ margin: "5px" }} color="info" variant="body1">
          Don't have an account?
        </Typography>
        <Link
          component="button"
          onClick={() => navigate("/signup")}
          underline="hover"
        >
          Click here to sign up!
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
