import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
	width?: string | number;
	height?: string | number;
	count?: number;
	className?: string;
}

const SkeletonLoader: React.FC<Props> = ({
	height = 50,
	width = "100%",
	count = 10,
	className,
}) => {
	return (
		<div>
			<Skeleton
				height={height}
				width={width}
				count={count}
				className={`rounded-lg ${className}`}
			/>
		</div>
	);
};

export default SkeletonLoader;
