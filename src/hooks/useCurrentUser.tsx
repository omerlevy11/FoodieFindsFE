export default function useCurrentUser() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        accessToken: "",
        email: "default",
        username: "default",
        imgUrl: "",
        refreshToken: "",
        _id: "",
      })
    );
  }
  return (
    JSON.parse(currentUser) ?? JSON.parse(localStorage.getItem("currentUser"))
  );
}
