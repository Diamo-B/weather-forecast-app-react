import { TfiLocationPin } from "react-icons/tfi";

const LocationInput = () => {

  return (
    <label className="input input-bordered flex items-center gap-2 mx-10 relative">
      <TfiLocationPin className="size-6 absolute left-2" />
      <input type="text" className="font-bold pl-7" placeholder="Location" />
    </label>
  );
}
 
export default LocationInput;