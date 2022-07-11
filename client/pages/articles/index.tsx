import Layout from "@/components/Layouts/Layout";
import protectedRoute from "@/components/protectedRoute";
import {
  articleAuthorSelector,
  deleteArticles,
  fetchArticleByAuthor,
} from "@/store/slices/articleSlice";
import { useAppDispatch } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext } from "next/types";
import { requestArticleByAuthor } from "@/services/articleService";
import { IArticleModel } from "@/models/article.model";

type Props = {
 
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

const Articles = ({}: Props) => {
  const dispatch = useAppDispatch();
  const articleList = useSelector(articleAuthorSelector);
  const router = useRouter();

  React.useEffect(() => {
    dispatch(fetchArticleByAuthor());
  }, [dispatch]);

  const handleDeleteArticle = async (id: string, title?: string) => {
    Swal.fire({
      title: "Do you want to delete this article?",
      html: `
      <h5>id</h5>
      <p>${id}</p>
      <h5>title</h5>
      <p>${title}</p>
      `,
      showCancelButton: true,
      confirmButtonText: "delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteArticles(id)).then((resp: any) => {
          if (resp.meta.requestStatus === "fulfilled") {
            Toast.fire({
              icon: "success",
              title: "delete article successfully",
            });

            dispatch(fetchArticleByAuthor());
          } else {
            Toast.fire({
              icon: "error",
              title: "delete article failed",
            });
          }
        });
      }
    });
  };
  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1 className="mb-5 text-center mt-3">My Articles</h1>

            <div className="text-end">
              <Link href="/articles/create">
                <a className="btn btn-primary">new article</a>
              </Link>
            </div>

            <span className="float-start">
              you have: {articleList?.length} article
            </span>
          </div>

          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center text-light bg-dark">
                    <th>id</th>
                    <th>Title</th>
                    <th>Text</th>
                    <th>updatedAt</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <React.Fragment>
                    {articleList?.map((article, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <tr className="text-center">
                            <td>{idx + 1}</td>
                            <td>{article.title}</td>
                            <td>{article.text}</td>
                            <td>
                              <Moment format="DD/MM/YYYY HH:mm">
                                {article.updatedAt}
                              </Moment>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className="btn btn-danger me-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#my-modal"
                                  onClick={() => {
                                    handleDeleteArticle(
                                      article.id,
                                      article.title
                                    );
                                  }}
                                >
                                  delete
                                </button>
                                <button
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#my-modal"
                                  onClick={() => {
                                    router.push(
                                      "/articles/edit?id=" + article.id
                                    );
                                  }}
                                >
                                  edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default protectedRoute(Articles);

