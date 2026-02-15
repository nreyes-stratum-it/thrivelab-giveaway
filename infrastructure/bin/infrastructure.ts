import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ThriveLabStack} from '../lib/thrivelab-stack';

const app = new cdk.App();

new ThriveLabStack(app, 'ThriveLabGiveawayStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'us-east-1',
    },

    stackName: 'ThriveLabGiveaway',

    tags: {
        Project: 'ThriveLabGiveaway',
        Environment: 'Production',
        ManagedBy: 'CDK',
    },
});

app.synth();