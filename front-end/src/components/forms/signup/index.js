import React, { useState,useEffect } from "react";
import "../login/style.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
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
              <h3 className="text-center">Sign Up</h3>
              {/* <div class="mb-2">
              <label htmlFor="name">Username</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter Username"
              />
            </div> */}
              <div class="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
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
