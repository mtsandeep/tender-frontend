import toast from "react-hot-toast";
import { NetworkData } from "~/types/global";
/**
 *
 * @param error The error object returned from metamask
 * @param defaultMessage The failure message to display if this is not handled
 */
export function displayErrorMessage(networkData: NetworkData, error: any, defaultMessage: string) {
  toast.dismiss();

  if (error.transaction?.hash) {
    toast.error(() => (
      <p>
        <a
          target="_blank"
          rel="noreferrer"
          href={`${networkData.blockExplorerUrl}/tx/${error.transactionHash}`}
        >
          {defaultMessage}
        </a>
      </p>
    ));
  } else if (error?.data?.message?.includes("insufficient funds")) {
    toast.error("Insufficient gas for the transaction.");
  } else if (error?.reason?.includes("invalid _amount")) {
    // when the requested amount is too small, GMX truncates to 0 and the transaction fails
    toast.error("Requested transaction amount too small.")
   } else {
    toast.error(error?.reason ?? defaultMessage);
  }
}
