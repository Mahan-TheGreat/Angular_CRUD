const PROXY_CONFIG = [
  {
    context: [
      "/api/*", "/api/**/*", 
      "/images/*", '/images/**/*'
    ],
    target: "https://localhost:7215",
    secure: false,
    changeOrigin : true,
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
