import { useContext } from "react";

import UserIdStorageContext from "../contexts/user-id-context";

const useUserIdStorage = () => {
	return useContext(UserIdStorageContext);
};

export default useUserIdStorage;
