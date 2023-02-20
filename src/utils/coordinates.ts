export const parseLatitude = (latitude: number): string => {
	return latitude > 0 ? `${latitude} °N` : `${latitude} °S`;
};

export const parseLongitude = (longitude: number): string => {
	return longitude > 0 ? `${longitude} °E` : `${longitude} °W`;
};
