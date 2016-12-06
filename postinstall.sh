#!/bin/sh

mkdir dynamo
cd dynamo
curl -L -O "http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz"
tar -xvf dynamodb_local_latest.tar.gz
