'use strict'

export function toSafeString(str) {
	var result = str.replace(/\&/g, '&#38;').replace(/\'/g, '&#39;').replace(/\"/g, '&#34;');
	return result;
}

export function toUnsafeString(str) {
	var result = str.replace(/&#38;/g, '&').replace(/&#34;/g, '\"').replace(/&#39;/g, '\'');
	return result;
}