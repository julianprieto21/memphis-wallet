"use client";
import { Transaction } from "@/app/lib/types";
import { formatBalance, formatDate, getBalanceByDay } from "@/app/lib/utils";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";
import { lang } from "@/app/lib/const/string-en";
import { useSearchParams } from "next/navigation";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any;
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <strong className="label">{formatDate(label)}</strong>
        <p className="desc">{formatBalance(payload[0].value, "auto")}</p>
      </div>
    );
  }

  return null;
};

export default function MonthChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const searchParams = useSearchParams();
  const accountId = searchParams.get("account");
  let filteredTransactions = transactions;
  if (accountId) {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.account_id === accountId
    );
  }
  const groupedTransactions = getBalanceByDay(
    filteredTransactions,
    month,
    year
  );

  return (
    <>
      <h1 className="sm:text-2xl font-semibold">{lang.monthChartText}</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={groupedTransactions}
          margin={{
            top: 5,
            right: 60,
            left: 60,
            bottom: 5,
          }}
        >
          <Tooltip
            content={<CustomTooltip active={true} payload={0} label="" />}
          />
          {/* <YAxis /> */}
          <XAxis dataKey="date" tick={false} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
