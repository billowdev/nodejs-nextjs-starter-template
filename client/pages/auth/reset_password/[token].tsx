import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layouts/Layout";

type Props = {};

export default function ResetPassword({}: Props) {
  const router = useRouter();
  const { token } = router.query;

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

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleResetPassword = (e: any) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
  };

  return (
    <Layout>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      />

      <div className="login-page bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h3 className="mb-3">Reset Password</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0">
                    <div className="form-left h-100 py-5 px-5">
                      <form onSubmit={handleResetPassword} className="row g-4">
                        <div className="col-12">
                          <label>
                            New Password<span className="text-danger">*</span>
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
                          </div>
                        </div>
                        <div className="col-12">
                          <label>
                            New Password confirmation
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <div className="input-group-text">
                              <i className="fas fa-lock" />
                            </div>
                            <input
                              type="password"
                              id="passwordConfirmation"
                              className="form-control"
                              placeholder="Enter Password"
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
                            Confirm
                          </button>

                          <div className="px-4 float-end mt-4">
                            <Link href="/auth/signin">
                              <a>
                                <span className="btn text-primary">Cancel</span>
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
