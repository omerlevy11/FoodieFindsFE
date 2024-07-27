import {
  faImage,
  faMinus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { uploadPhoto } from "../../services/file-service";
import { editPost } from "../../services/posts-service";
import { Post } from "../../types/post.type";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  post: Post;
  refetch: () => void;
}

export default function EditPost({
  isOpen,
  onOpenChange,
  post,
  refetch,
}: Props) {
  const currentUser = useCurrentUser();

  const [imgSrc, setImgSrc] = useState<File | null | undefined>();
  const [content, setContent] = useState<string>(post.content);
  const [isInitialPostDeleted, setIsInitialPostDeleted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  //   const emailInputRef = useRef<HTMLInputElement>(null)
  //   const passwordInputRef = useRef<HTMLInputElement>(null)
  const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };
  const selectImg = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!isOpen) {
      setImgSrc(null);
      setContent("");
      setIsInitialPostDeleted(false);
    }
  }, [isOpen, post]);

  useEffect(() => {
    setContent(post.content);
  }, [post]);

  const getNewImgUrl = async (imgSrc: File | null | undefined) => {
    if (imgSrc) return await uploadPhoto(imgSrc!);
    return post.imgUrl;
  };

  const handleEdit = async (onClose: () => void) => {
    // setIsSubmitted(true);
    const imgUrl = await getNewImgUrl(imgSrc);
    const editedPostBody = { ...post, content, imgUrl };
    const editedPost = await editPost(editedPostBody);
    if (editedPost) {
      onClose();
      refetch();
    }
    // const user: IUser = {
    //   email,
    //   username,
    //   password,
    //   imgUrl,
    // };
    // const registeredUser = await registerUser(user);
    // if(registeredUser && !isInvalid) {
    //     localStorage.setItem('currentUser', JSON.stringify(registeredUser))
    //     navigate({ to: '/home/me' });
    // }
  };
  const renderEditImage = () => {
    if (!post.imgUrl && !imgSrc) return;
    if (!isInitialPostDeleted || imgSrc) {
      return (
        <>
          <Badge
            content={<FontAwesomeIcon icon={faMinus} />}
            className="cursor-pointer py-1 px-1.5"
            onClick={() => {
              setIsInitialPostDeleted(true);
              setImgSrc(null);
            }}
          >
            <img
              src={imgSrc ? URL.createObjectURL(imgSrc) : post.imgUrl}
              className="h-52 w-52 rounded"
            />
          </Badge>
        </>
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Edit Review
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="flex space-x-4">
                  <Avatar
                    alt="user avatar"
                    className="w-12 h-12 self-center"
                    src={currentUser.imgUrl}
                  />
                  <div className="flex flex-col items-center space-y-0.5">
                    <span className="self-start">{currentUser.username}</span>
                    <Chip
                      size="sm"
                      startContent={<FontAwesomeIcon icon={faUserGroup} />}
                      className="text-white h-fit py-0.5 rounded-md w-full"
                    >
                      public
                    </Chip>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center position-relative">
                  {renderEditImage()}
                </div>

                <input
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  type="file"
                  onChange={imgSelected}
                />
                <Textarea
                  placeholder={`What is your review, ${currentUser.username}?`}
                  value={content}
                  onValueChange={setContent}
                />

                <div
                  onClick={selectImg}
                  className="border-[2px] text-sm text-foreground-600 rounded-xl w-full h-12 flex justify-between p-2 items-center cursor-pointer"
                >
                  <span>Edit your Review</span>
                  <FontAwesomeIcon
                    icon={faImage}
                    className="fa-xl text-default cursor-pointer"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={() => handleEdit(onClose)}
                  fullWidth
                >
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
