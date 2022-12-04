module.exports = {
    resolve:{
        fallback:{
            "url": require.resolve("url/"),
            "querystring": false,
            "path": require.resolve("path-browserify") ,
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "zlib": require.resolve("browserify-zlib")

        }
    }
};