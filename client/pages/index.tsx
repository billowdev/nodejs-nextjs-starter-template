import type { NextPage } from "next";
import { useEffect } from "react";
import protectedRoute from "@/components/protectedRoute";
import { useAppDispatch } from "@/store/store";
import { articleAuthorSelector, fetchAllArticles } from "@/store/slices/articleSlice";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const article = useSelector(articleAuthorSelector);
  useEffect(() => {
    
  }, [dispatch]);
  return (
    <>

    </>
  );
};

export default protectedRoute(Home);
