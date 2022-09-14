interface IconProps {
  icon: string;
}

function Icon({ icon }: IconProps): JSX.Element {
  return <span className="material-symbols-outlined">{icon}</span>;
}

export default Icon;
