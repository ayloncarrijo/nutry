import "twin.macro";

interface IconProps {
  icon: string;
}

function Icon({ icon }: IconProps): JSX.Element {
  return (
    <div
      tw="flex justify-center items-center"
      className="material-symbols-outlined"
    >
      {icon}
    </div>
  );
}

export default Icon;
