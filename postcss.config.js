
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {}
	},
	autoprefixer: {},
	"postcss-pxtorem": {
		rootValue: 0, // 75表示750设计稿，37.5表示375设计稿
		propList: ["*"],
	},
}
