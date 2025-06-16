const truncateTextByChar = (text, maxLength) => {
	if (!text) return "";
	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default truncateTextByChar;
