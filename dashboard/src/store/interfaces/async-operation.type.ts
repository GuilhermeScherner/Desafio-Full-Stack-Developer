import { RequestStatusEnum } from "store/enums";

export type AsyncOperationType<T = void> = {
  status: RequestStatusEnum;
  data?: T;
  errorMessage?: string | any;
};
