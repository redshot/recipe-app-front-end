const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
 
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

/**
 * - This app is optimized so it is production ready
 * - This app will be executed or run through this file
 * - Compression in Node.js and Express decreases the downloadable amount of data that’s served to users. 
 *   Through the use of this compression, we can improve the performance of our Node.js applications as our payload size
 *   is reduced drastically. Source: https://www.digitalocean.com/community/tutorials/nodejs-compression
 * 
 * - Code flow: 
 *  - Import/require compression package to minimize the size of prduction build
 *  - Invoke express app through app variable
 *  - Apply compression as middleware
 *  - Serve the static build of the app in the "build" folder when we run "npm run build" command
 */