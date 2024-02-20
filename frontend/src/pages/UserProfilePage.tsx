import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { toast } from "sonner";

const UserProfilePage = () => {
  const {
    mutate: updateUser,
    isLoading,
    isSuccess,
    isError,
  } = useUpdateMyUser();

  if (isSuccess) {
    toast.success("User updated successfully");
  } else if (isError) {
    toast.error("Error updating user");
  }

  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
};

export default UserProfilePage;
