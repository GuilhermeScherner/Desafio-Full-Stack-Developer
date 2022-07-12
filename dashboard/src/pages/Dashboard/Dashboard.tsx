import { Table } from "components";
import { useEffect } from "react";
import { listRatesThunk, useAppDispatch, useTypedSelector } from "store";
import { shallowEqual } from "react-redux";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const listRatesState = useTypedSelector(
    (state) => state.rates.listRatesState,
    shallowEqual
  );
  useEffect(() => {
    dispatch(listRatesThunk());

    return clearInterval;
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(listRatesThunk());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="flex max-w-screen-lg flex-col gap-6">
      <div>
        <h2 className="text-gray-700 text-2xl font-semibold mb-2">
          Todas as criptomoedas
        </h2>
        <Table listRates={listRatesState.data} />
      </div>
    </div>
  );
};
