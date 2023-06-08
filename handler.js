'use strict';
const sharp = require('sharp');

/**
 * Resizes an image and returns it as a base64 string
 * @param {string} imageBase64 - Base64 encoded image data
 * @param {number[]} desiredWidths - Array of desired widths
 * @returns {Promise<{ [key: number]: string }>} Object with resized images as base64 strings
 */
const resizeImage = async (imageBase64, desiredWidths) => {
	const imageBuffer = Buffer.from(imageBase64, 'base64');
	const metadata = await sharp(imageBuffer).metadata();

	const resizedImages = {};

	await Promise.all(
		desiredWidths.map(async (desiredWidth) => {
			const resizedImageBuffer = await sharp(imageBuffer)
				.resize(desiredWidth, metadata.height)
				.toFormat(metadata.format)
				.toBuffer();

			resizedImages[desiredWidth] = resizedImageBuffer.toString('base64');
		})
	);

	return resizedImages;
};

module.exports.resize = async (event) => {
	try {
		const { body } = event;
		const { imageBase64, widths } = JSON.parse(body);

		const resizedImages = await resizeImage(imageBase64, widths);

		return {
			statusCode: 200,
			body: JSON.stringify(resizedImages),
		};
	} catch (error) {
		console.error('Error:', error);
		return { statusCode: 500, body: 'Error resizing image' };
	}
};
