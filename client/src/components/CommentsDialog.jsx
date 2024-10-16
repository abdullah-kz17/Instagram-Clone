import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { DialogContent } from "./ui/dialog";
import { DialogTitle } from "./ui/dialog";
import { AvatarImage } from "./ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";

const CommentDialog = ({
  comments,
  openComments,
  setOpenComments,
  onClose,
}) => {
  return (
    <Dialog open={true} className="w-full max-w-4xl">
      <DialogContent
        className="p-4"
        onInteractOutside={() => setOpenComments(false)}
      >
        <div className="flex justify-between items-center mb-4">
          <DialogTitle>Comments</DialogTitle>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2 pr-4">
            <img
              src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-1/2">
            <ul className="space-y-2">
              {comments.map((comment, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="h-4 w-4"
                    />
                  </Avatar>
                  <span className="font-semibold">{comment.author}</span>{" "}
                  {comment.content}
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
