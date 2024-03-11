import '../styles/neighborhoodlogo.css';

interface Props {
  widthClass?: string;
}

function NeighborhoodLogo({ widthClass = "w-full" }: Props) {
  return (
    <div
      className="flex justify-center items-center h-full"
      style={{ height: "100%" }}
    >
      <picture>
        <source srcSet="src/assets/logo.webp" type="image/webp" />
        <source srcSet="src/assets/logo.png" type="image/png" /> 
        <img
          src="src/assets/logo.png"
          alt="logo"
          className={`${widthClass} h-5/6 pulse`}
        />
      </picture>
    </div>
  );
}

export default NeighborhoodLogo;
