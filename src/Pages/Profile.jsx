import Profile from "../Components/Profile";
import { useUserState } from "../utils/UserState";
import { useParams } from "react-router-dom";

const MyProfile = () => {
  const { getUser } = useUserState();
  const User = getUser();
  const { id } = useParams();



  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      desc="Welcome to your personalized profile page. Share your Products to sell and look for the products that you are interested in."
      id={User.id}
    />
  );
};

export default MyProfile;
