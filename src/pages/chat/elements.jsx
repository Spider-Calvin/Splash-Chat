import { useState } from 'react';

export function ImageWithPlaceholder({ src, alt }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className='flex h-full w-full items-center justify-center'>
			{!loaded && (
				<div className='flex h-96 w-72 items-center justify-center'>
					<div className='h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500'></div>
				</div>
			)}
			<img
				src={src}
				alt={alt}
				className={`h-auto w-full object-contain ${!loaded ? 'hidden' : ''}`}
				onLoad={() => setLoaded(true)}
				onError={() => setLoaded(true)}
			/>
		</div>
	);
}

export function VideoWithPlaceholder({ src }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className='flex h-full w-full items-center justify-center'>
			{!loaded && (
				<div className='flex h-96 w-72 items-center justify-center'>
					<div className='h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500'></div>
				</div>
			)}
			<video
				controls
				onLoadedData={() => setLoaded(true)}
				onError={() => setLoaded(true)}
				className={`h-auto w-full object-contain ${!loaded ? 'hidden' : ''}`}>
				<source src={src} type='video/mp4' />
				Your browser does not support the video tag.
			</video>
		</div>
	);
}
