import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import axiosInstance from "../lib/axios";

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  profile: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    bio: z.string().max(200, "Bio must be less than 200 characters"),
  }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${originalTitle} - Sign Up`;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const signUp = async (
    email: string,
    password: string,
    profile: { name: string; bio: string }
  ) => {
    const response = await axiosInstance.post("/auth/signup", {
      email,
      password,
      profile,
    });
    if (response.status === 201) {
      navigate("/signin");
    }
  };

  const [signUpError, setSignUpError] = useState<string | string[] | null>(
    null
  );

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await signUp(data.email, data.password, data.profile);
    } catch (error) {
      if (error instanceof Error) {
        setSignUpError(error.message);
      }
      if (error instanceof AxiosError) {
        setSignUpError(error.response?.data.message || "An error occurred");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <img src="/eg-logo.webp" alt="Logo" className="form-logo" />
        <Typography variant="h4" gutterBottom>
          Sign Up
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
          <Controller
            name="profile.name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.profile?.name}
                helperText={errors.profile?.name?.message}
              />
            )}
          />
          <Controller
            name="profile.bio"
            control={control}
            defaultValue="i am a new User"
            render={({ field }) => (
              <TextField
                {...field}
                label="Bio"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.profile?.bio}
                helperText={errors.profile?.bio?.message}
              />
            )}
          />
          {signUpError && signUpError instanceof Array ? (
            signUpError.map((error, index) => (
              <Typography
                key={index}
                sx={{ marginBottom: "10px" }}
                color="error"
                variant="body2"
              >
                {error}
              </Typography>
            ))
          ) : (
            <Typography
              sx={{ marginBottom: "10px" }}
              color="error"
              variant="body2"
            >
              {signUpError}
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
            Sign Up
          </Button>
        </form>
        <Typography sx={{ margin: "5px" }} color="info" variant="body1">
          Already have an account?
        </Typography>
        <Link
          component="button"
          onClick={() => navigate("/signin")}
          underline="hover"
        >
          Click here to sign in!
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
