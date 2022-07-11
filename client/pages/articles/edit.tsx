import Layout from "@/components/Layouts/Layout";
import protectedRoute from "@/components/protectedRoute";
import { IArticleModel } from "@/models/article.model";
import { requestArticleById } from "@/services/articleService";
import { updateArticles } from "@/store/slices/articleSlice";
import { useAppDispatch } from "@/store/store";
import moment from "moment";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";

type Props = {
  article?: IArticleModel;
};

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

const EditArticle = ({ article }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [title, setTitle] = React.useState(article?.title!);
  const [text, setText] = React.useState(article?.text!);
  
  const handleUpdateArticle = async (e: any) => {
    e.preventDefault();
    const id = article?.id;
    const response = await dispatch(updateArticles({ id, title, text }));
    if (response.meta.requestStatus === "fulfilled") {
      Toast.fire({
        icon: "success",
        title: "update article successfully",
      });
      router.push("/articles")
      setTitle("");
      setText("");
    } else {
      Toast.fire({
        icon: "error",
        title: "update article failed",
      });
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center py-5 vh-100">
          <div className="col-lg-9 col-md-12 mb-4">
            <form className="mt-5">
              <h1>Update Article</h1>
              <div className="form-group">
                <label htmlFor="InputArticleTitle">ID</label>
                <input
              
                  readOnly
                  value={article?.id}
                  type="text"
                  className="form-control"
                  id="InputArticleTitle"
                  aria-describedby="articleTitleHelp"
                  placeholder="Enter title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="InputArticleTitle">Title</label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  defaultValue={article?.title}
                  type="text"
                  maxLength={150}
                  className="form-control"
                  id="InputArticleTitle"
                  aria-describedby="articleTitleHelp"
                  placeholder="Enter title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="InputArticleText">Text</label>
                <textarea
                  defaultValue={article?.text}
                  maxLength={500}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  rows={4}
                  className="form-control"
                  id="InputArticleText"
                  placeholder="Input your body of your article here."
                />
              </div>

              <div className="form-group">
                <label htmlFor="InputArticleTitle">Last update</label>
                <input
                  readOnly
                  value={moment(article?.updatedAt).format("DD/MM/YYYY HH:mm")}
                  type="text"
                  className="form-control"
                  id="InputArticleTitle"
                  aria-describedby="articleTitleHelp"
                  placeholder="Enter title"
                />
              </div>

              <Link href={"/articles"}>
                <button className="btn btn-secondary mt-3 me-3">Cancel</button>
              </Link>
              <button
                onClick={(e) => {
                  handleUpdateArticle(e);
                }}
                className="btn btn-primary mt-3"
              >
                update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default protectedRoute(EditArticle);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;
  if (id) {
    const article = await requestArticleById(id);
    return {
      props: {
        article,
      },
    };
  } else {
    return { props: {} };
  }
};
