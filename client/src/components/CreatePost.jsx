import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataUri } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const { user } = useAuth();
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { authenticationToken } = useAuth();

  const createPostHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) {
      formData.append("image", file);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/post/addpost",
        formData,
        {
          headers: {
            Authorization: authenticationToken,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Add new post to existing posts in state
        dispatch(setPosts([response.data.post, ...posts]));
        toast.success(response.data.message);
        resetForm(); // Reset form fields
        setOpen(false); // Close dialog after successful post creation
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUri = await readFileAsDataUri(selectedFile);
      setImagePreview(dataUri);
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setFile("");
    setImagePreview("");
    setCaption("");
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-semibold">
          Create New Post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.userData?.profilePicture} alt="image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">
              {user?.userData?.username}
            </h1>
            <span className="text-gray-600 text-xs">{user?.userData?.bio}</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent border-none"
          placeholder="Write a caption...."
        />
        {imagePreview && (
          <img src={imagePreview} alt="preview" className="w-full h-64" />
        )}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto bg-[#0095F6] hover:[#248bcf]"
        >
          Select from computer
        </Button>
        <Button
          type="submit"
          className={`w-full ${!imagePreview ? "hidden" : ""}`}
          onClick={createPostHandler}
          disabled={loading}
        >
          {loading ? "Please wait ....." : "Post"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
