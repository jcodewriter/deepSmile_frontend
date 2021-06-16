import PixRestore from "src/modules/pix/pages/Restore";
import { useRouter } from "next/router";

interface RestoreProps {
  token: string;
}

const Restore = () => {
  const router = useRouter();
  return <PixRestore token={router.query.token as string} />;
};

export default Restore;
