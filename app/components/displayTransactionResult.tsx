import toast from "react-hot-toast";
import { NetworkData } from "~/types/global";

export function displayTransactionResult(networkData: NetworkData, hash: string, message: string) {

  toast.dismiss();
  toast.success(() => (
    <p>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${networkData.blockExplorerUrl}/tx/${hash}`}
      >
        {message}
      </a>
    </p>
  ));
}
