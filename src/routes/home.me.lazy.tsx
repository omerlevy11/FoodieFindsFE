import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import NoPost from "../components/Posts/NoPost";
import Posts from "../components/Posts/Posts";
import UploadPostCard from "../components/Posts/UploadPostCard";
import useCurrentUser from "../hooks/useCurrentUser";
import { getAllUserPosts } from "../services/posts-service";

export const Route = createLazyFileRoute("/home/me")({
  component: HomeMe,
});

function HomeMe() {
  const user = useCurrentUser();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllUserPosts(user._id),
  });

  return (
    <div className="m-10 flex flex-col items-center space-y-8">
      <UploadPostCard refetch={refetch} />
      {posts?.length && !isLoading ? (
        <Posts posts={posts} refetch={refetch} userId={user._id} />
      ) : (
        <NoPost />
      )}
    </div>
  );
}
