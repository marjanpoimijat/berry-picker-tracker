import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RouteButtonContainer from "../../components/route-button-container";

describe("RouteButtonContainer", () => {
	it("Has 'Hide route' text visible when show route has been set to true", async () => {
		const resetRouteCoordinates = jest.fn();
		const changeShowRoute = jest.fn();

		const { getByText } = render(
			<RouteButtonContainer
				resetRouteCoordinates={resetRouteCoordinates}
				changeShowRoute={changeShowRoute}
				showRoute={true}
			/>
		);

		fireEvent.press(getByText("Hide route"));

		await waitFor(() => {
			expect(changeShowRoute).toHaveBeenCalledTimes(1);
			expect(getByText("Hide route")).toBeDefined();
		});
	});

	it("Has 'Show route' text visible when show route has been set to false", async () => {
		const resetRouteCoordinates = jest.fn();
		const changeShowRoute = jest.fn();

		const { getByText } = render(
			<RouteButtonContainer
				resetRouteCoordinates={resetRouteCoordinates}
				changeShowRoute={changeShowRoute}
				showRoute={false}
			/>
		);

		fireEvent.press(getByText("Show route"));

		await waitFor(() => {
			expect(changeShowRoute).toHaveBeenCalledTimes(1);
			expect(getByText("Show route")).toBeDefined();
		});
	});

	it("Has 'Reset route' button and it can be pressed", async () => {
		const resetRouteCoordinates = jest.fn();
		const changeShowRoute = jest.fn();

		const { getByText } = render(
			<RouteButtonContainer
				resetRouteCoordinates={resetRouteCoordinates}
				changeShowRoute={changeShowRoute}
				showRoute={true}
			/>
		);

		fireEvent.press(getByText("Reset route"));

		await waitFor(() => {
			expect(resetRouteCoordinates).toHaveBeenCalledTimes(1);
			expect(getByText("Reset route")).toBeDefined();
		});
	});
});
