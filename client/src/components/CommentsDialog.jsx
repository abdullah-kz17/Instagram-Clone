import { Button } from "./ui/button";
import { Dialog, DialogHeader } from "./ui/dialog";
import { DialogContent } from "./ui/dialog";
import { DialogTitle } from "./ui/dialog";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";

const CommentDialog = ({
  comments,
  openComments,
  setOpenComments,
  onClose,
  post,
}) => {
  return (
    <Dialog open={openComments} onOpenChange={setOpenComments}>
      <DialogHeader>
        <div className="flex items-center space-x-2">
          {post?.author && (
            <>
              <Avatar>
                <AvatarImage
                  src={post.author.profilePicture}
                  alt={post.author.username}
                  className="h-8 w-8 rounded-full"
                />
              </Avatar>
              <span className="font-semibold">{post.author.username}</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span>{new Date(post?.createdAt).toLocaleString()}</span>
        </div>
      </DialogHeader>
      <DialogContent
        className="p-0 h-auto max-w-4xl flex flex-col"
        onInteractOutside={() => setOpenComments(false)}
      >
        <div className="flex justify-between items-center mb-4">
          <DialogTitle>Comments</DialogTitle>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="flex space-x-4 flex-1">
          <div className="w-1/2 pr-4">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-1/2">
            <ul className="space-y-2">
              {comments.map((comment) => (
                <li key={comment._id} className="flex items-center space-x-2">
                  {comment.author && (
                    <>
                      <Avatar>
                        <AvatarImage
                          src={comment.author.profilePicture}
                          alt={comment.author.username}
                          className="h-8 w-8 rounded-full"
                        />
                      </Avatar>
                      <span className="font-semibold">
                        {comment.author.username}
                      </span>
                      <span>{comment.text}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
