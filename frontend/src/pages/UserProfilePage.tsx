import { useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { toast } from "sonner";

const UserProfilePage = () => {
  const {
    mutate: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useUpdateMyUser();

  if (isSuccess) {
    toast.success("User updated successfully");
  } else if (error) {
    toast.error(error.toString());
    reset();
  }

  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
};

export default UserProfilePage;
