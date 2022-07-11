import Layout from "@/components/Layouts/Layout";
import protectedRoute from "@/components/protectedRoute";
import { fetchSession, signIn } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

type Props = {};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const SignIn = ({}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [eye, setEye] = useState(true);
  const handleTogglePassword = (e: any) => {
    e.preventDefault();
    setEye(!eye);
    // const togglePassword = document.querySelector("#togglePassword");
    const password: any = document.querySelector("#password");

    let type;
    if (password.getAttribute("type") === "password") {
      type = "text";
      setEye(false);
    } else {
      type = "password";
    }
    password.setAttribute("type", type);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await dispatch(signIn({ email, password }));
    if (response.meta.requestStatus === "fulfilled") {
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      router.push("/");
    } else {
      Toast.fire({
        icon: "error",
        title: "Signed in failed try again!",
      });
    }
  };

  return (
    <Layout>
      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3">Sign In</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form onSubmit={handleLogin} className="row g-4">
                        <div className="col-12">
                          <label>
                            Email<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="fas fa-envelope" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Enter email"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label>
                            Password<span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="fas fa-lock" />
                            </div>
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="Enter Password"
                              required
                            />
                            <button
                              className="btn"
                              onClick={(e) => {
                                handleTogglePassword(e);
                              }}
                            >
                              {eye === true ? (
                                <i className="fas fa-eye" />
                              ) : (
                                <i className="fas fa-eye-slash" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="inlineFormCheck"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineFormCheck"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <Link href="/auth/forgot_password">
                            <a className="float-end text-primary">
                              Forgot Password?
                            </a>
                          </Link>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 float-end mt-4"
                          >
                            sign in
                          </button>
                          <div className="px-4 float-end mt-4">
                            <span>have no account ?</span>
                            <Link href="/auth/signup">
                              <a>
                                <span className="btn text-primary">
                                  sign up
                                </span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 ps-0 d-none d-md-block">
                    <div className="form-right h-100 bg-login text-white text-center pt-5">
                      <Image
                        alt="logo"
                        className="logo "
                        src="/resources/static/img/billowdev-logo.png"
                        height={150}
                        width={150}
                      />
                      <h2 className="mt-3">billowdev&apos;s example</h2>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="https://github.com/billowdev/nextjs-redux-toolkit-template">
                <a>
                  <p className="text-end text-secondary mt-3">
                    https://github.com/billowdev/nextjs-redux-toolkit-template
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>
        {`
          a {
            text-decoration: none;
          }
          .login-page {
            width: 100%;
            height: 100vh;
            display: inline-block;
            display: flex;
            align-items: center;
          }
          .form-right i {
            font-size: 100px;
          }

          .bg-login {
            background-color: #3b90ff;
          }

          .logo {
            border-radius: 50%;
          }

          .text__status {
            font-size: 1.5rem;
          }

          .status-page {
            width: 100%;
            height: 100vh;
            align-items: center;
            text-align: center;
            display: inline-block;
            display: flex;
          }
        `}
      </style>
    </Layout>
  );
};

export default protectedRoute(SignIn);
