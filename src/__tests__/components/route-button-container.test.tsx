import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RouteButtonContainer from "../../components/route-button-container";

describe("RouteButtonContainer", () => {
	it("Has 'Hide route' text visible when show route has been set to true", async () => {
		const changeTracking = jest.fn();
		const changeShowRoute = jest.fn();

		const { getByText } = render(
			<RouteButtonContainer
				changeTracking={changeTracking}
				changeShowRoute={changeShowRoute}
				showRoute={true}
				isTracking={false}
				tripId={null}
			/>
		);

		fireEvent.press(getByText("Hide route"));

		await waitFor(() => {
			expect(changeShowRoute).toHaveBeenCalledTimes(1);
			expect(getByText("Hide route")).toBeDefined();
		});
	});

	it("Has 'Show route' text visible when show route has been set to false", async () => {
		const changeTracking = jest.fn();
		const changeShowRoute = jest.fn();

		const { getByText } = render(
			<RouteButtonContainer
				changeTracking={changeTracking}
				changeShowRoute={changeShowRoute}
				showRoute={false}
				isTracking={false}
				tripId={null}
			/>
		);

		fireEvent.press(getByText("Show route"));

		await waitFor(() => {
			expect(changeShowRoute).toHaveBeenCalledTimes(1);
			expect(getByText("Show route")).toBeDefined();
		});
	});

	it("Has 'Start trip' text visible when is tracking has been set to false", async () => {
		const changeTracking = jest.fn();
		const changeShowRoute = jest.fn();

		const { getByText } = render(
			<RouteButtonContainer
				changeTracking={changeTracking}
				changeShowRoute={changeShowRoute}
				showRoute={true}
				isTracking={false}
				tripId={null}
			/>
		);

		fireEvent.press(getByText("Start trip"));

		await waitFor(() => {
			expect(changeTracking).toHaveBeenCalledTimes(1);
			expect(getByText("Start trip")).toBeDefined();
		});
	});

	it("Has 'End trip + trip ID' text visible when is tracking has been set to true", async () => {
		const changeTracking = jest.fn();
		const changeShowRoute = jest.fn();
		const tripId = "test-trip-ID";

		const { getByText } = render(
			<RouteButtonContainer
				changeTracking={changeTracking}
				changeShowRoute={changeShowRoute}
				showRoute={true}
				isTracking={true}
				tripId={tripId}
			/>
		);

		fireEvent.press(getByText("End trip - " + tripId));

		await waitFor(() => {
			expect(changeTracking).toHaveBeenCalledTimes(1);
			expect(getByText("End trip - " + tripId)).toBeDefined();
		});
	});
});
