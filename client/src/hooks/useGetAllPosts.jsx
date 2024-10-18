import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import { useAuth } from "@/store/AuthContext";

const useGetAllPosts = () => {
  const { authenticationToken } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/post/all", {
          headers: { Authorization: authenticationToken },
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setPosts(response.data.posts));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authenticationToken) {
      fetchAllPosts();
    }
  }, [authenticationToken, dispatch]);
};

export default useGetAllPosts;
