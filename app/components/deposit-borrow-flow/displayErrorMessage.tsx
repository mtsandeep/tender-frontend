import toast from "react-hot-toast";
/**
 *
 * @param error The error object returned from metamask
 * @param defaultMessage The failure message to display if this is not handled
 */
export function displayErrorMessage(error: any, defaultMessage: string) {
  if (error.data.message.includes("insufficient funds")) {
    toast.error("Insufficient gas for the transaction.");
  } else {
    toast.error(defaultMessage);
  }
}
