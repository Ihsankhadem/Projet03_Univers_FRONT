import React from "react";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  emptyText?: string;
}

export default function DataTable<T>({
  data,
  columns,
  emptyText = "Aucune donnée",
}: Props<T>) {
  if (!data.length) {
    return (
      <p className="text-center py-10 text-slate-400 text-sm">{emptyText}</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-widest"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/60 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3.5 ${col.className}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
