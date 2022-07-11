import Layout from "@/components/Layouts/Layout";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";

type Props = {};

export default function ForgotPassword({}: Props) {
  const [responseText, setResponseText] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendMail = (e: any) => {
    console.log(email);
    if (email === "") {
      setError(true);
      setResponseText("กรุณากรอกอีเมล");
    } else if (email !== "test@test.com") {
      setError(true);
      setResponseText("Email Not Found");
    } else {
      setError(false);
      setResponseText("Send email successfuly");
    }
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
              <h3 className="mb-3">Forgot Password?</h3>
              <div className="bg-white shadow rounded">
                <div className="row">
                  <div className="col-md-7 pe-0 mb-5">
                    <div className="form-left h-100 py-5 px-5">
                      <div className="row g-4">
                        <div className="col-12">
                          <label className="mt-4 mb-3">
                            Please enter your email for reset your password
                            <span className="text-danger">*</span>
                          </label>
                          <label className="mb-3">
                            <span className="text-danger">
                              {error && <>&nbsp;{responseText} !</>}
                            </span>
                            <span className="text-success">
                              {!error && <>&nbsp;{responseText} !</>}
                            </span>
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
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            onClick={(e) => {
                              handleSendMail(e);
                            }}
                            className="me-3 btn btn-primary px-4 float-end mt-4"
                          >
                            send mail
                          </button>
                          <Link href="/auth/signup">
                            <a>
                              <span className="btn text-primary float-start mt-4">
                                Sign Up
                              </span>
                            </a>
                          </Link>
                          <Link href="/auth/signin">
                            <a>
                              <span className="btn text-primary float-start mt-4">
                                Sign In
                              </span>
                            </a>
                          </Link>
                        </div>
                      </div>
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
