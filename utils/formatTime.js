const formatTime = (data) => {
	return new Date(data).toLocaleString("zh-TW", {
		year: "numeric",
		month: "numeric",
		day: "2-digit",
		hour: "2-digit",
		minute: "numeric",
		timeZone: "Asia/Taipei",
	});
};

export default formatTime;
