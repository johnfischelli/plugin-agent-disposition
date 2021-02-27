## Disclaimer: This sample code is not production ready and is only intended as an example of how you might achieve updating disposition information before a Flex task completes. Please use as a starting point or idea of how to achieve something similar and test thoroughly before implementing in production.

# Flex Agent Disposition + WFO

![Agent Disposition UI](https://indigo-bombay-5783.twil.io/assets/agent-disposition.png)

Ask Agents to classify the intent of a conversation during post wrap-up but before Task Completion. The captured data will be submitted into WFO for reporting.

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards install the dependencies by running `npm install`:

```bash
cd plugin-agent-disposition

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it, in order to deply it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex which would provide them globally.