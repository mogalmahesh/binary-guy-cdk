import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { config } from 'dotenv';
config();

export class AwsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambda.Function(this, "LambdaFunctionFromCDK", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.handler",
      code: lambda.AssetCode.fromAsset("../lambda-code"),
      memorySize: 512,
      timeout: Duration.seconds(10),
      environment: {
        ENV: "dev",
        DB_URL: "https:dev.example.com",
        DB_PASSWORD: process.env.DEV_DB_PASSWORD!,
      }
    });
  }
}
