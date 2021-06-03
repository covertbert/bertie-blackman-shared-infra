import { expect as expectCDK, haveResourceLike } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import { IAMStack } from './iam'

describe('IAMStack', () => {
  const app = new cdk.App()
  const stack = new IAMStack(app, 'iam')

  it('creates a stack deployment IAM user', () => {
    expectCDK(stack).to(
      haveResourceLike('AWS::IAM::User', {
        UserName: 'StackDeploymentUser',
      }),
    )
  })

  it('creates an IAM policy with the correct actions', () => {
    expectCDK(stack).to(
      haveResourceLike('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: [
            {
              Action: [
                'cloudformation:*',
                'budgets:*',
                's3:*',
                'iam:*',
                'cloudfront:*',
                'acm:*',
                'route53:*',
                'ses:*',
                'sns:*',
              ],
            },
          ],
        },
      }),
    )
  })
})