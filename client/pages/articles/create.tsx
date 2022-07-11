import Layout from "@/components/Layouts/Layout";
import protectedRoute from "@/components/protectedRoute";
import { createArticles } from "@/store/slices/articleSlice";
import { useAppDispatch } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

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

const CreateArticle = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const handleCreateArticle = async (e: any) => {
    e.preventDefault();
    const response = await dispatch(createArticles({ title, text }));
    if (response.meta.requestStatus === "fulfilled") {
      Toast.fire({
        icon: "success",
        title: "create article successfully",
      });
      router.push("/articles")
      setTitle("");
      setText("");
    } else {
      Toast.fire({
        icon: "error",
        title: "create article failed",
      });
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center py-5 vh-100">
          <div className="col-lg-9 col-md-12 mb-4">
            <form className="mt-5">
              <h1>Create Article</h1>
              <div className="form-group">
                <label htmlFor="InputArticleTitle">Title</label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  maxLength={150}
                  type="text"
                  className="form-control"
                  id="InputArticleTitle"
                  aria-describedby="articleTitleHelp"
                  placeholder="Enter title"
                />
                <small id="articleTitleHelp" className="form-text text-muted">
                  Input your article title here.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="InputArticleText">Text</label>
                <textarea
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  maxLength={500}
                  rows={4}
                  className="form-control"
                  id="InputArticleText"
                  placeholder="Input your body of your article here."
                />
                <small id="articleTitleHelp" className="form-text text-muted">
                  Input your article text here.
                </small>
              </div>

              <Link href={"/articles"}>
                <button className="btn btn-secondary mt-3 me-3">Cancel</button>
              </Link>
              <button
                onClick={(e) => {
                  handleCreateArticle(e);
                }}
                className="btn btn-primary mt-3"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default protectedRoute(CreateArticle);
