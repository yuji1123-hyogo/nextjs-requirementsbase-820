module.exports = {
  presets: [
    ["@babel/preset-env"],        // 最新JS
    ["@babel/preset-react", { runtime: "automatic" }],      // JSX変換
    ["@babel/preset-typescript"], // TS/TSX対応
  ],
};
