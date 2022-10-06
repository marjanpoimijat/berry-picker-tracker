import { useContext } from "react";

import RouteIdStorageContext from "../contexts/route-id-context";

const useRouteIdStorage = () => {
	return useContext(RouteIdStorageContext);
};

export default useRouteIdStorage;
