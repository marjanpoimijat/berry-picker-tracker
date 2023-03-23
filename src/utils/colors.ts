export const getColor = (id: number): string => {
	return colors[id % colors.length];
};

const colors: string[] = [
	"#DC143C", // Crimson
	"#2ECC40", // Green
	"#FFDC00", // Yellow
	"#B10DC9", // Purple
	"#39CCCC", // Turquoise
	"#FF851B", // Orange
	"#85144b", // Maroon
	"#FF4136", // Red
	"#FF6F61", // Coral
	"#001f3f", // Navy
	"#FFC0CB", // Pink
	"#F012BE", // Magenta
	"#3D9970", // Olive
	"#111111", // Black
	"#FFD700", // Gold
	"#9B59B6", // Amethyst
	"#F7DC6F", // Khaki
	"#34495E", // Slate gray
	"#2C3E50", // Midnight blue
	"#0074D9", // Blue
	"#E74C3C", // Brick red
];
