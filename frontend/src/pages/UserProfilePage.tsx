import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { toast } from "sonner";

const UserProfilePage = () => {
  const { data: currentUser, isLoading: isGetLoading } = useGetMyUser();

  const {
    mutate: updateUser,
    isLoading: isUpdateLoading,
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
  if (isGetLoading) return <div>Loading...</div>;

  if (!currentUser) return <div>No user found</div>;

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
    />
  );
};

export default UserProfilePage;
