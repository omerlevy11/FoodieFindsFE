import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import NoPost from "../components/Posts/NoPost";
import Posts from "../components/Posts/Posts";
import { getAllUserPosts } from "../services/posts-service";

export const Route = createLazyFileRoute("/home/$userId")({
  component: HomeOther,
});

function HomeOther() {
  const { userId } = Route.useParams();
  const {
    data: posts,
    isLoading,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getAllUserPosts(userId),
  });

  return (
    <div className="m-10 flex flex-col items-center space-y-8">
      {posts?.length && !isLoading ? (
        <Posts posts={posts} refetch={refetchPosts} userId={userId} />
      ) : (
        <NoPost />
      )}
    </div>
  );
}
