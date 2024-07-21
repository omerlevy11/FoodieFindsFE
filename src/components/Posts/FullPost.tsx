import { faPaperPlane, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { createComment } from "../../services/posts-service";
import { Post } from "../../types/post.type";
import Comments from "./Comments";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  post: Post;
  refetch: () => void;
}
export default function FullPost({
  isOpen,
  onOpenChange,
  post,
  refetch,
}: Props) {
  const currentUser = useCurrentUser();
  const [comment, setComment] = useState("");

  const { imgUrl, content } = post;

  const [comments, setComments] = useState(post.comments);

  const createCommentMutation = useMutation({
    mutationFn: async (payload) =>
      await createComment(payload.id, payload.content),
    onSuccess: (data) => {
      console.log(data);
      refetch();
      setComments([...comments, data]);
      setComment("");
    },
  });

  useEffect(() => setComments(post.comments), [post]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalBody className="p-0">
                <Card className="rounded-none">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <div className="flex space-x-4">
                      <Avatar
                        alt="user avatar"
                        className="w-12 h-12 self-center"
                        src={post.userImgUrl}
                      />
                      <div className="flex flex-col items-center space-y-0.5">
                        <span className="self-start">{post.username}</span>
                        <Chip
                          size="sm"
                          startContent={<FontAwesomeIcon icon={faUserGroup} />}
                          className="text-white h-fit py-0.5 rounded-md w-full"
                        >
                          public
                        </Chip>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={imgUrl}
                      width={270}
                    />
                    <p className="self-start">{content}</p>
                  </CardBody>
                </Card>
                <Comments comments={comments} />
                {/* <Divider/> */}
                {/* <div>hello</div> */}
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Avatar
                  alt="user avatar"
                  className="w-10 h-10"
                  src={currentUser.imgUrl}
                />
                <Textarea
                  placeholder="Enter your comment..."
                  fullWidth
                  value={comment}
                  onValueChange={setComment}
                  endContent={
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      onClick={() =>
                        createCommentMutation.mutate({
                          id: post._id as string,
                          content: comment,
                        })
                      }
                      className="self-end cursor-pointer text-foreground-600 hover:text-white"
                    />
                  }
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
