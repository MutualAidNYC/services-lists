/**
 * Is Valid URL?
 * Validate a URL by trying to create an instance of URL.
 * If the provided value is falsey or crating an instance throws an error, return false.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
 * @param {string|undefined} url 
 * @return {boolean} False if creating a URL instance threw an error. 
 */
export function isValidUrl( url: string | undefined ): boolean {
	if ( ! url ) {
		return false;
	}
	try {
		new URL( url ?? '' );
	} catch ( err ) {
		return false;
	}
	return true;
}