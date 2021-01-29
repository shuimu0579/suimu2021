# serverless 在腾讯云的实践

- [serverless 文档中心--腾讯云](https://cloud.tencent.com/document/product/1154/41936)
- [腾讯云 serverless 入门课程](https://cloud.tencent.com/edu/learning/learn-1889-22491)

```js
npm install -g serverless
serverless -v

sls create -h
serverless create --template tencent-nodejs --path serverless-test
sls deploy

sls invoke -h
sls invoke -f hello_world

sls info
sls metrics
sls logs -h
sls logs -f hello_world
```
