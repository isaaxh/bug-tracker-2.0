/* import MoonLoader from "react-spinners/MoonLoader"; */
import BarLoader from "react-spinners/BarLoader";

type LoaderPropsType = {
  loading: boolean;
};

const Loader = ({ loading }: LoaderPropsType) => {
  return (
    <div className="loader-container">
      <BarLoader
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
