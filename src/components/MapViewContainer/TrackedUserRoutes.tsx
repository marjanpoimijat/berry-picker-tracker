import { TrackedUserRoutesProps } from "../../types";
import TrackedUserRoute from "./TrackedUserRoute";

const TrackedUserRoutes = ({ users }: TrackedUserRoutesProps) => (
	<>
		{users.map((user) => (
			<TrackedUserRoute
				key={user.id}
				user={user}
			/>
		))}
	</>
);

export default TrackedUserRoutes;
