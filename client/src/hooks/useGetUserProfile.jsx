import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "@/store/AuthContext";
import { setUserProfile } from "@/redux/authSlice";

const useGetUserProfile = (userId) => {
  const { authenticationToken } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/auth/${userId}/profile`,
          {
            headers: { Authorization: authenticationToken },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(setUserProfile(response.data.user));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authenticationToken) {
      fetchUserProfile();
    }
  }, [authenticationToken, dispatch, userId]);
};

export default useGetUserProfile;
