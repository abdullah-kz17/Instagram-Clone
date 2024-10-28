import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPosts } from "@/redux/postSlice";
import { useAuth } from "@/store/AuthContext";
import { setSuggestedUsers } from "@/redux/authSlice";

const useGetAllSuggestedUsers = () => {
  const { authenticationToken } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/suggested",
          {
            headers: { Authorization: authenticationToken },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setSuggestedUsers(response.data.users));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authenticationToken) {
      fetchAllUsers();
    }
  }, [authenticationToken, dispatch]);
};

export default useGetAllSuggestedUsers;
