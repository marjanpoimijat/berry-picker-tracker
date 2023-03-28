import { TrackedUserRoutesProps } from "../../types";
import TrackedUserRoute from "./TrackedUserRoute";

/**
 * Renders every tracked user's route on the map.
 *
 * @param {TrackedUser[]} users A list of the TrackedUser objects.
 * @returns {JSX.Element} A new TrackedUsersRoute component.
 */
const TrackedUserRoutes = ({ users }: TrackedUserRoutesProps): JSX.Element => (
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
