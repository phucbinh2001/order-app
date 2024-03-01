import { Flex, Skeleton } from "antd";

const foods = [1, 2, 3, 4, 5];

const FoodListSkeleton = () => {
  return (
    <div className="mt-5">
      {foods.map((item, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  );
};

export default FoodListSkeleton;

const SkeletonItem = () => {
  return (
    <div className="flex rounded-xl mb-3 overflow-hidden ">
      <Skeleton.Avatar shape="square" active size={100} />
      <div className="flex flex-col w-full p-2 ml-2 relative">
        <Skeleton.Button size="small" block active />

        <Flex
          justify="space-between"
          align="center"
          className="mt-auto"
          style={{ width: "100%" }}
        >
          <span className="font-semibold text-sm">
            <Skeleton.Button active size="small" style={{ width: 80 }} />
          </span>
          <Skeleton.Button active size="large" />
        </Flex>
      </div>
    </div>
  );
};
