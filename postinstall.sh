#!/bin/sh

mkdir dynamo
cd dynamo
curl -L -O "https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz"
tar -xvf dynamodb_local_latest.tar.gz
