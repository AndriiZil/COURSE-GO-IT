const { Storage } = require('@google-cloud/storage');

async function uploadFileToGoogleCloud(bucketName, destinationFile) {
    try {
        const storage = new Storage({
            keyFilename: 'evident-factor-291817-99b801d4b0b6.json'
        });
    
        await storage.bucket(bucketName).upload(destinationFile, {
            gzip: true,
            metadata: {
            cacheControl: 'public, max-age=31536000',
            },
            public: true,
            private: false,
        });
    
        return `${destinationFile} uploaded to ${bucketName}.`;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    uploadFileToGoogleCloud
}