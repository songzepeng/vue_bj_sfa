module.exports = {
  presets: [
    //百度查的这个错误，不明白什么意思
    ["@babel/env", { modules: false }]
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "mint-ui",
        style: true
      }
    ]
  ]
};
