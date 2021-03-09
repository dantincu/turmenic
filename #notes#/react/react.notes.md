# How to create a react app without the `create-react-app` tool

From https://javascript.plainenglish.io/a-guide-to-creating-a-react-app-without-create-react-app-5337c5ac2ea0  

After running the `npm init` command, install the following packages:

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader html-webpack-plugin
```

Create an `index.html` and put the following html code in it:

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=devide-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" conent="ie=edge">
        <title>Scratch React App</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="app.js"></script>
    </body>
</html>
```

Add react, babel and webpack to `package.json`:

```
{
  "name": "scratch-react",
  "version": "1.0.0",
  "description": "",
  "main": ".index.js",
    "babel": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ]
    },
  "scripts": {
    "start": "webpack-dev-server --open",
    "test": "echo \"Error: no test specified\" && exit 1",
    "create": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "css-loader": "^4.3.0",
    "html-webpack-plugin": "^4.4.1",
    "style-loader": "^1.2.1",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
}
```

Then put this in index.js:

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

Put this in App.js:

```
import React from 'react';

function App() {
    return (
        <div>Hello World!</div>
    );
}
export default App;
```

Put this in index.css:

```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

Check out this great information about .gitignore in general and in React apps [here](https://www.pluralsight.com/guides/creating-gitignore-for-clean-react-repository "Creating a .gitignore for a Clean React Repository").

In order to compile into an App.js file, create in your main folder a file, `webpack.config.js` and add the following to the new file:

```
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.(js)$/, 
                use: 'babel-loader' 
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            }
        ]
    },
    mode: 'development',
    plugins: [

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}
```

