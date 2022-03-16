import Button from "../../main/components/Button";
import { useDeleteAccount } from "../api/useDeleteAccount";
import { useAuth } from "../../main/hooks/useAuth";
import { useCookies } from "react-cookie";
import { constants } from "../../constants/constants";
import { useRouter } from "next/router";
import Modal from "../../main/components/Modal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DeleteAccountModal = ({ open, setOpen }: Props) => {
  const { me } = useAuth();
  const { deleteUserAccount } = useDeleteAccount(me?.username);
  const [, , removeCookies] = useCookies([constants.AUTH_PROVIDER_COOKIE, constants.SESSION_TOKEN_COOKIE]);
  const router = useRouter();

  const onCloseModal = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    onCloseModal();
    await deleteUserAccount();
    handleRemoveCookies();
    router.push("/");
  };

  const handleRemoveCookies = () => {
    removeCookies(constants.AUTH_PROVIDER_COOKIE);
    removeCookies(constants.SESSION_TOKEN_COOKIE);
  };

  return (
    <Modal open={open} setOpen={setOpen} title="Delete Account">
      <div className="mt-6">
        <p> Are you sure you want to delete your account ?</p>
        <p>This action cannot be undone</p>
        <div className="flex flex-row justify-between">
          <Button onClick={onCloseModal} text="Cancel" className="bg-blue-primary hover:bg-blue-500 text-white font-bold rounded" />
          <Button onClick={onSubmit} text="Delete Account" className="bg-red-primary hover:bg-red-600 text-white font-bold rounded" />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
