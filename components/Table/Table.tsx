import { TableSummary } from "@/types/table";
import { formatMinutesToTimeString } from "@/utils/date";
import { formatMoney } from "@/utils/money";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Table = ({
  type = 1,
  data,
  onClick,
}: {
  type?: number;
  data: TableSummary;
  onClick: () => void;
}) => {
  const [stayTime, setStayTime] = useState(0);

  const freeTable = data.startAt == 0;

  const tableBorder1 = !freeTable ? "bg-orange-100" : "bg-transparent";
  const tableBorder2 = !freeTable ? "bg-orange-200" : "bg-slate-300";
  const tableBorder3 = !freeTable
    ? "bg-orange-500"
    : type == 2
    ? "bg-orange-300"
    : "bg-white";

  const textColor = !freeTable
    ? "text-white"
    : type == 2
    ? "text-orange-800"
    : "text-black";

  useEffect(() => {
    calcStayTime(data.startAt);
  }, [data]);

  const calcStayTime = (startAt: number) => {
    if (startAt === 0) return setStayTime(0);

    const updateStayTime = () => {
      const currentTime = dayjs();
      const stayTime = currentTime.diff(dayjs(startAt), "minutes");
      setStayTime(stayTime);
    };

    // Update stay time initially
    updateStayTime();

    // Set interval to update stay time every minute
    const intervalId = setInterval(updateStayTime, 60000);

    // Clear interval when component unmounts or when startAt is 0
    return () => clearInterval(intervalId);
  };

  return (
    <div
      className="relative p-3 size-fit xl:hover:scale-110 hover:scale-75 duration-300 cursor-pointer xl:scale-100 scale-[70%]"
      onClick={onClick}
    >
      <div className={`size-52 rounded-3xl p-2 z-20 relative`}>
        <div className={`size-full rounded-3xl ${tableBorder2} p-2`}>
          <div
            className={`size-full rounded-3xl ${tableBorder3} p-5 ${textColor} flex flex-col gap-2 justify-center`}
          >
            <h2 className="text-center font-semibold">{data.title}</h2>
            {data.startAt > 0 && (
              <>
                <div className="flex items-center gap-1 border rounded-full  border-orange-400 pl-1 w-fit pr-2">
                  <RiMoneyDollarCircleFill className="text-xl" />{" "}
                  {formatMoney(data.totalMoney)}đ
                </div>
                <div className="flex items-center gap-1 border rounded-full  border-orange-400 w-fit pr-2 pl-1">
                  <FaClock className="text-base" />{" "}
                  {formatMinutesToTimeString(stayTime)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={`chair z-10 absolute w-16 h-10 rounded-xl ${tableBorder3} top-0 left-[50%] -translate-x-[50%]`}
      ></div>
      <div
        className={`chair z-10 absolute w-16 h-10 rounded-xl ${tableBorder3} bottom-0 left-[50%] -translate-x-[50%]`}
      ></div>
      <div
        className={`chair z-10 absolute w-10 h-16 rounded-xl ${tableBorder3} left-0 top-[50%] -translate-y-[50%]`}
      ></div>
      <div
        className={`chair z-10 absolute w-10 h-16 rounded-xl ${tableBorder3} right-0 top-[50%] -translate-y-[50%]`}
      ></div>
    </div>
  );
};

export default Table;
