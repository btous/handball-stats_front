module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/_variables.scss";`
            }
        }
    },
    // proxy all webpack dev-server requests starting with /api
    // to our Spring Boot backend (localhost:8080) using http-proxy-middleware
    // see https://cli.vuejs.org/config/#devserver-proxy

    devServer: {
        port: 8081, // tells vue where to run it's project (= to npm run serve -- --port 8081)
        /*
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true
            }
        }*/
    },

    // Change build paths to make them Maven compatible
    // see https://cli.vuejs.org/config/
    /*
    outputDir: 'target/dist',
    assetsDir: 'static'
    */

    pwa: {
        name: 'handballstats',
        themeColor: '#73ecff', //default
        msTileColor: '#929292', //default
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default', //default
        manifestPath: 'manifest.webmanifest.json', // default
        manifestOptions: {
            name: 'handballstats',
            short_name: 'HS',
            start_url: '/',
            display: 'standalone',
            theme_color: '#929292',
            background_color: '#929292',
            icons: [
                {
                    "src": "/img/icons/android-chrome-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/img/icons/android-chrome-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ]
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/msapplication-icon-144x144.png',
        },

        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW', // default
        workboxOptions: {}
    }
};