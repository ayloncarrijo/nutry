import Icon, { IconProps } from "components/Icon";
import "twin.macro";

function IconButton(props: IconProps): JSX.Element {
  return (
    <button
      type="button"
      tw="w-10 h-10 rounded-full flex justify-center items-center hover:(bg-white bg-opacity-10)"
    >
      <Icon {...props} />
    </button>
  );
}

export default IconButton;
