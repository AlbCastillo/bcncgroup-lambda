import sharp from 'sharp';

/**
 * Resizes an image and returns it as a base64 string
 * @param imageBase64 - Base64 encoded image data
 * @param desiredWidth - Base64 encoded image data
 * @returns Base64 encoded image data
 */
const resizeImage = async (imageBase64, desiredWidth) => {
	const imageBuffer = Buffer.from(imageBase64, 'base64');
	const metadata = await sharp(imageBuffer).metadata();

	const resizedImage = await sharp(imageBuffer)
		.resize(desiredWidth, metadata.height)
		.toBuffer()
		.toFormat(metadata.format)
		.toBuffer();

	return resizedImage.toString('base64');
};

export async function handler(event) {
	try {
		const { body } = event;
		const { imageBase64, width } = JSON.parse(body);

		const resizedImage = await resizeImage(imageBase64, width);

		return {
			statusCode: 200,
			body: JSON.stringify({ resizedImage }),
		};
	} catch (error) {
		console.error('Error:', error);
		return { statusCode: 500, body: 'Internal Server Error' };
	}
}
