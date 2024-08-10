async function getBlogId(url, apiKey) {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/byurl?url=${url}&key=${apiKey}`)
    const data = await response.json();
    return data.id;
}

async function getPosts(blogId, apiKey) {
    let posts = [];
    let nextPageToken = '';
    let response;

    response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
    do {
        const data = await response.json();
        posts = posts.concat(data.items);
        nextPageToken = data.nextPageToken;
        response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&pageToken=${nextPageToken}`);
    } while (nextPageToken);
    return posts;
}

async function generateHTMLPage(url, apiKey) {
    try {
        const blogId = await getBlogId(url);
        const posts = await getPosts(blogId);
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Archive for ${url}</title>
            </head>
            <body>
                <ul>
        `;

        posts.forEach(post => {
            htmlContent += `
                <li><a href="${post.url}" target="_blank">${post.title}</a></li>
            `;
        });

        htmlContent += `
                </ul>
            </body>
            </html>
        `;

        // Assuming you're running this in a Node.js environment, you can write the file to disk:
        const fs = require('fs');
        fs.writeFileSync('blog-posts.html', htmlContent);
        console.log('HTML file created successfully!');
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

const urlIndex = process.argv.indexOf('--url');
const apiKeyIndex = process.argv.indexOf('--apiKey');
let url, apiKey;

if (urlIndex > -1 && apiKeyIndex > -1) {
    url = process.argv[urlIndex + 1];
    apiKey = process.argv[apiKeyIndex + 1];
} else {
    console.error('Missing required argument(s). Please provide a valid Blogger URL and a Blogger API key');
    process.exit();
}
// Start the process
generateHTMLPage(url, apiKey);
