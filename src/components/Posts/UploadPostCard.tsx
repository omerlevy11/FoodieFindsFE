import {
  Avatar,
  Card,
  CardBody,
  Divider,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import CreatePost from "./CreatePost";

interface Props {
  refetch: () => void;
}
export default function UploadPostCard({ refetch }: Props) {
  const currentUser = useCurrentUser();
  const createPostDisclosure = useDisclosure();

  return (
    <>
      <Card className="py-4 w-3/6 ">
        <CardBody className="overflow-visible py-2 flex justify-around h-32">
          <div className="flex flex-row items-center space-x-2">
            <Avatar
              alt="user avatar"
              className="w-10 h-10 self-center"
              src={currentUser.imgUrl}
            />
            <div onClick={createPostDisclosure.onOpen} className="w-full">
              <Input
                classNames={{
                  base: "h-10",
                  mainWrapper: "h-full",
                  input: "text-small  cursor-pointer",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder={`What are you Thinking on, ${currentUser.username}?`}
                size="sm"
                isReadOnly
              />
            </div>
          </div>
          <Divider />
          <span className="text-foreground-600 pl-2">
            Add your Advize on a vacation
          </span>
        </CardBody>
      </Card>
      <CreatePost {...createPostDisclosure} refetch={refetch} />
    </>
  );
}
