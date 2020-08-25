module.exports = {
    mode: 'production',
    optimization: {
        minimize: false
    },
    entry: "./src/index.ts",
    output: {
        path: __dirname + "dist/lib",
        library: "ConvergenceInputElementBinder",
        libraryTarget: "umd",
        umdNamedDefine: true,
        filename: "convergence-input-element-bindings.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
    },
    plugins: [],
    externals: {
        "@convergence/string-change-detector":{
            commonjs:"@convergence/string-change-detector",
            commonjs2:"@convergence/string-change-detector",
            root: 'StringChangeDetector'
        },
        "@convergence/convergence":{
            commonjs:"@convergence/convergence",
            commonjs2:"@convergence/convergence",
            root: 'Convergence'
        }
    }
};
