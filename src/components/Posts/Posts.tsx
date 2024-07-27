import { faEllipsis, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { deletePost } from "../../services/posts-service";
import { Post } from "../../types/post.type";
import EditPost from "./EditPost";
import FullPost from "./FullPost";

interface Props {
  posts: Post[];
  refetch?: () => void;
  userId?: string;
}
export default function Posts({ posts, refetch, userId }: Props) {
  const currentUser = useCurrentUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(posts[0]);
  const [isPopOverOpenArr, setIsPopOverOpenArr] = useState(
    posts.map(() => false)
  );

  const handlePostPress = (post: Post) => {
    setSelectedPost(post);
    onOpen();
  };

  const handleEditOpen = (isPopOverOpen: boolean, index: number) => {
    modifyPopOver(isPopOverOpen, index);
    setSelectedPost(posts[index]);
    onEditOpen();
  };

  const modifyPopOver = (isPopOverOpen: boolean, index: number) => {
    const copyPopOvers = [...isPopOverOpenArr];
    copyPopOvers[index] = isPopOverOpen;
    setIsPopOverOpenArr(copyPopOvers);
  };

  const handleDeletePost = async (post: Post, index: number) => {
    const res = await deletePost(post);
    if (res === "Deleted successfully") {
      refetch();
      modifyPopOver(false, index);
    }
  };

  return (
    <>
      {posts.map((post, index) => (
        <Card
          key={post._id}
          className="py-4 w-3/6"
          isPressable
          onPress={() => handlePostPress(post)}
        >
          <CardHeader className="pb-0 pt-2 px-4 justify-between">
            <div className="flex space-x-4">
              <Avatar
                alt="user avatar"
                className="w-10 h-10 self-center"
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
            {userId === currentUser._id && (
              <Popover
                placement="bottom"
                isOpen={isPopOverOpenArr[index]}
                onOpenChange={(open) => modifyPopOver(open, index)}
              >
                <PopoverTrigger>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="self-start w-5 h-5"
                  />
                </PopoverTrigger>
                <PopoverContent className="p-0 space-y-1">
                  <Button
                    onClick={() => handleEditOpen(false, index)}
                    variant="light"
                    fullWidth
                  >
                    Edit Review
                  </Button>
                  <Button
                    onClick={() => handleDeletePost(posts[index], index)}
                    variant="light"
                    fullWidth
                  >
                    Delete Review
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </CardHeader>
          <CardBody className=" flex overflow-visible py-2 items-center">
            {post.imgUrl && (
              <Image
                alt="Card background"
                className="object-cover rounded-xl my-4"
                src={post.imgUrl}
                width={500}
                height={200}
              />
            )}
            <p className="self-start mt-2 ml-2">{post.content}</p>
            <p className="self-start mt-2 ml-2 text-xs">
              {post.comments.length
                ? `${post.comments.length} comments`
                : "No comments"}
            </p>
          </CardBody>
        </Card>
      ))}
      <FullPost
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        post={selectedPost}
        refetch={refetch}
      />
      <EditPost
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        post={selectedPost}
        refetch={refetch}
      />
    </>
  );
}
