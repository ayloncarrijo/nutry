import type { Food } from "types/api";

interface FoodCardProps {
  food: Food;
}

function FoodCard({ food }: FoodCardProps): JSX.Element {
  return <div>{JSON.stringify(food)}</div>;
}

export default FoodCard;
