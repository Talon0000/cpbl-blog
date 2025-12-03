import z from "zod";

export const postFormSchema = z.object({
	type: z.enum(["news", "discussion"]),
	teams: z
		.array(
			z.enum([
				"統一7-ELEVEn獅",
				"中信兄弟",
				"樂天桃猿",
				"富邦悍將",
				"味全龍",
				"台鋼雄鷹",
			])
		)
		.nonempty("請至少選擇一個球隊"),
	title: z.string().nonempty("標題為必填欄位"),
	content: z.string().nonempty("內容為必填欄位"),
	images: z
		.custom(
			(val) => {
				if (!(val instanceof FileList)) return false;
				return Array.from(val).every((file) => file.type.startsWith("image/"));
			},
			{
				error: "只允許上傳圖片檔案",
			}
		)
		.optional(),
});

export const postDbSchema = z.object({
	author: z.string(),
	type: z.enum(["news", "discussion"]),
	teams: z
		.array(
			z.enum([
				"統一7-ELEVEn獅",
				"中信兄弟",
				"樂天桃猿",
				"富邦悍將",
				"味全龍",
				"台鋼雄鷹",
			])
		)
		.nonempty("請至少選擇一個球隊"),
	title: z.string().nonempty("標題為必填欄位"),
	content: z.string().nonempty("內容為必填欄位"),
	images: z.array(z.url()).optional(),
});

export const commentSchema = z.object({
	author: z.string(),
	post: z.string(),
	content: z.string().min(1, "內容不可為空"),
});
