import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSumbit = (e) => {
    e.preventDefault();
    navigate("/login");
    console.log(data);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          Loading...
        </div>
      ) : (
        <div className="login template vh-100 bg-light d-flex justify-content-center align-items-center">
          <div className="form_container p-5 rounded bg-white border">
            <form onSubmit={handleSumbit}>
              <h3 className="text-center">Sign In</h3>
              <div class="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              {/* <div className=" d-flex mb-2">
                <input
                  type="checkbox"
                  className="custome-control coustome-checkbox"
                  id="check"
                  placeholder="Enter Password"
                />
                <label htmlFor="check" className="custom-input-label ms-2">
                  Remember me
                </label>
              </div> */}
              <div className="d-grid">
                <button type="button" className="btn btn-primary">
                  Sign In
                </button>
              </div>
              <p className="text-end mt-2 mb-1">
                <Link className="text-decoration-none" to="#">
                  Forgot Password?
                </Link>
              </p>
              <p className="text-end">
                Don't you have an account?{" "}
                <Link className="text-decoration-none" to="/signup">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
