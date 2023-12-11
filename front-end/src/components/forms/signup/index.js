import "../login/style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../redux/slice/user/thunk";
import { useForm } from "react-hook-form";

const Signup = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(signup(data));
  };
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          Loading...
        </div>
      ) : (
        <div className="login template vh-100 bg-light d-flex justify-content-center align-items-center">
          <div className="form_container p-5 rounded bg-white border">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-center">Sign Up</h3>
              <div class="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                />
                {errors?.email?.type === "required" && (
                  <p className="error-form-field text-danger">
                    This field is required
                  </p>
                )}
                {errors?.email?.type === "pattern" && (
                  <p className="error-form-field text-danger">
                    Email is invalid
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                    },
                  })}
                />
                {errors?.password?.type === "required" && (
                  <p className="error-form-field text-danger">
                    This field is required
                  </p>
                )}
                {errors?.password?.type === "pattern" && (
                  <p className="error-form-field text-danger">
                    Password must be include 6 characters one letter & number
                  </p>
                )}
              </div>
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p className="text-end mt-3">
                Already Register?{" "}
                <Link className="text-decoration-none" to="/login">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
