import { toast } from "sonner";
// import "./toastNotification.scss";
export const successNotification = (msg: string) => {
  // alert(msg);
  toast.success(msg);
};

export const errorNotification = (msg: string) => {
  // alert(msg);
  toast.error(msg);
};

export const warnNotification = (msg: string) => {
  // alert(msg);
  toast.warning(msg);
};

export const loadingNoti = (msg: any) => {
  return toast.loading(msg);
};
