import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IIlyaLambda } from './iilya-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IilyaLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new IIlyaLambda(this, 'iilya-lambda')
  }
}
