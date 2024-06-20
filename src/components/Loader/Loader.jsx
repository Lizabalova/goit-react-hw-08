import { Hourglass } from "react-loader-spinner";
export default function Loader(){

    return (
      <div>
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#E5E4E2", "#848884;"]}
        />
        <p>Loading data, please wait...</p>
      </div>
    );
}