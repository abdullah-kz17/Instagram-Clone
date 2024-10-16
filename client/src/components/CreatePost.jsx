import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataUri } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/store/AuthContext";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  const { authenticationToken } = useAuth();

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) {
      formData.append("image", file);
    }
    setLoading(true);
    console.log(file, caption);
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
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUri = await readFileAsDataUri(file);
      setImagePreview(dataUri);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-semibold">
          Create New Post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="" alt="image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">Username</h1>
            <span className="text-gray-600 text-xs">Bio here...</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent border-none"
          placeholder="write a caption...."
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
        {imagePreview && (
          <Button
            type="submit"
            className="w-full"
            onClick={createPostHandler}
            disabled={loading}
          >
            {loading ? "Please wait ....." : "Post"}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
