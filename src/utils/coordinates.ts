export const parseLatitude = (latitude: number): string => {
	return latitude > 0 ? `${latitude} °N` : `${-1 * latitude} °S`;
};

export const parseLongitude = (longitude: number): string => {
	return longitude > 0 ? `${longitude} °E` : `${-1 * longitude} °W`;
};
