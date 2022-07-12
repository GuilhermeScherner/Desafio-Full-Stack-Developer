import { useAppDispatch } from "store";

import { setLoading } from "store/reducers";

export const useLoading = () => {
  const dispatch = useAppDispatch();

  const startLoading = () => {
    dispatch(setLoading(true));
  };

  const stopLoading = () => {
    dispatch(setLoading(false));
  };

  return [startLoading, stopLoading];
};
