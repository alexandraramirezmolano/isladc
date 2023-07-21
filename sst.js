import { Stack, StackProps } from 'serverless-stack';
import * as sst from '@serverless-stack/resources';

export default class MyStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create an S3 bucket for hosting the Next.js app assets
    const bucket = new sst.Bucket(this, 'NextjsAppBucket', {
      websiteIndexDocument: 'index.html',
    });

    // Create a Lambda function to serve the Next.js app using Next.js' serverless support
    const nextjsFunction = new sst.Function(this, 'NextjsAppFunction', {
      bundle: {
        // Set the path to your Next.js app relative to the root of your SST project
        srcPath: 'src',
        handler: 'src/lambda.handler',
      },
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    // Create an API Gateway to route requests to the Lambda function
    const api = new sst.Api(this, 'NextjsApi', {
      defaultFunctionProps: {
        srcPath: 'src',
        environment: {
          BUCKET_NAME: bucket.bucketName,
        },
      },
      routes: {
        'GET /': nextjsFunction,
        'ANY {proxy+}': nextjsFunction,
      },
    });

    // Allow the Lambda function to read from the S3 bucket
    bucket.grantRead(nextjsFunction);
  }
}
