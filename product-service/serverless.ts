import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      QUEUE_URL: {
        Ref: "CatalogItemsQueue",
      },
      SNS_ARN: {
        Ref: "SNSTopic",
      }
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: {
          "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
        },
      },
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: {
          Ref: "SNSTopic",
        },
      },
    ],
  },
  resources: {
    Resources: {
      CatalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "product-sqs",
        },
      },
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "createProductTopic"
        }
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: "snstest20112020@gmail.com",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            result: ["error"],
          }
        }
      }
    },
    Outputs: {
      CatalogItemsQueue: {
        Value: {
          Ref: "CatalogItemsQueue",
        },
        Export: {
          Name: "CatalogItemsQueue",
        },
      },
      CatalogItemsQueueUrl: {
        Value: {
          Ref: "CatalogItemsQueue",
        },
        Export: {
          Name: "CatalogItemsQueueUrl",
        },
      },
      CatalogItemsQueueArn: {
        Value: {
          "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
        },
        Export: {
          Name: "CatalogItemsQueueArn",
        },
      },
    },
  },
  functions: {
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
          }
        }
      ]
    },
    getProductById: {
      handler: 'handler.getProductById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{id}',
            request: {
              parameters: {
                paths: {
                  id: true,
                }
              }
            }
          }
        }
      ]
    },
    createProduct: {
      handler: 'handler.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
          }
        }
      ]
    },
    preflight: {
      handler: 'handler.preflight',
      events: [
        {
          http: {
            method: 'options',
            path: 'products',
          }
        }
      ]
    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              "Fn::GetAtt": ["CatalogItemsQueue", "Arn"],
            },
          }
        }
      ]
    },
  }
};

module.exports = serverlessConfiguration;
