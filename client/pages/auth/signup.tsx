import Layout from "@/components/Layouts/Layout";
import { signIn, signUp, userSelector } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {};

export default function SignUp({}: Props) {
  const dispatch = useAppDispatch();

  const [eye, setEye] = useState(true);
  const handleTogglePassword = () => {
    setEye(!eye);
    // const togglePassword = document.querySelector("#togglePassword");
    const password: any = document.querySelector("#password");
    const passwordConfirmation: any = document.querySelector(
      "#passwordConfirmation"
    );
    let type;
    if (password.getAttribute("type") === "password") {
      type = "text";
      setEye(false);
    } else {
      type = "password";
    }
    password.setAttribute("type", type);
    passwordConfirmation.setAttribute("type", type);
  };
  const [messageError, setMessageError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    if (password != passwordConfirmation) {
      setMessageError("password not match");
    } else {
      setMessageError("");
    }
  }, [password, passwordConfirmation]);

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

  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await dispatch(signUp({ email, password }));

    if (response.meta.requestStatus === "fulfilled") {
      Swal.fire({
        icon: "success",
        title: "success...",
        text: "signup successfuly",
      });
      router.push("/auth/signin");
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
              <h3 className="mb-3">Sign Up</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form onSubmit={handleRegister} className="row g-4">
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
                            Password
                            <span className="text-danger">
                              *{messageError ?? messageError}
                            </span>
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
                              min={8}
                              max={150}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label>
                            Password confirmation
                            <span className="text-danger">
                              &nbsp;
                              {messageError ?? messageError}
                            </span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="fas fa-lock" />
                            </div>
                            <input
                              type="password"
                              id="passwordConfirmation"
                              className="form-control"
                              min={8}
                              max={150}
                              placeholder="Enter Password"
                              onChange={(e) => {
                                setPasswordConfirmation(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-check">
                            <div
                              className="btn"
                              onClick={(e) => {
                                handleTogglePassword();
                              }}
                            >
                              {eye === true ? (
                                <i className="fas fa-eye" />
                              ) : (
                                <i className="fas fa-eye-slash" />
                              )}
                            </div>
                            <label
                              className="form-check-label"
                              htmlFor="inlineFormCheck"
                            >
                              show password
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="me-3 btn btn-primary px-4 float-end mt-4"
                          >
                            Sign Up
                          </button>

                          <div className="px-4 float-end mt-4">
                            <span>Already have an account ?</span>
                            <Link href="/auth/signin">
                              <a>
                                <span className="btn text-primary">
                                  Sign In
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
}
