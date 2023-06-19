# BCNCGroup Image Lambda

This repository contains the AWS lambda function that resizes images for the BCNC GROUP IMAGE-TEST API-REST.

## AWS Lambda
The Lambda function provides an endpoint for image resizing: [BCNC GROUP IMAGE-TEST](https://github.com/AlbCastillo/bcncgroup-image-test/). The endpoint can be accessed at: https://bf1bxf41u1.execute-api.eu-west-1.amazonaws.com/dev/resizeImage.

## Local Testing
You can test the Lambda function locally using the Serverless Offline plugin. To do so, run the command: `serverless offline`. This will make the function available at: http://localhost:3000/resizeImage.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
Alberto Castillo at albcasmol@gmail.com.
