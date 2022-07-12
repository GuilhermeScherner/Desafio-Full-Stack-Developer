import React from "react";
import { percentValue } from "helpers";

type Props = {
  listRates?: any[];
};

export const Table = ({ listRates }: Props) => {
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100"></header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Simbolo</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Nome</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-end">Preço</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-end">Variação</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {listRates?.map((rate, index) => {
                return (
                  <tr key={index}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-slate-800">{rate.symbol}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {rate.name.charAt(0).toUpperCase() + rate.name.slice(1)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-end">${rate.price.toFixed(2)}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-end">
                        {percentValue(rate.change_24h, rate.price).toFixed(2)} %
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
