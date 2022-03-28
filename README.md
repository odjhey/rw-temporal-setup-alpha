## stack
- https://redwoodjs.com/
- https://temporal.io/
- https://min.io/

## todo
- [ ] setup husky
- [ ] setup linter
- [ ] setup prettier
- [ ] feat: upload file
- [ ] feat: multiple processing state
- [ ] test cancel/retry
- [ ] play with temporal! (see that the ts-sdk is enough, may have to go with the golang-sdk otherwise)
- [ ] VERY IMPORTANT: try to deploy multiple workers in separate machines
- [ ] IMPORTANT: workflow run type, to be able to do pre validations before trying to invode workflow signals/queries
- [ ] auto generate workflowServices
- [ ] auto generate workflows
- [ ] decide a bucket hierarchy
- [ ] modularize object store access (extract common operations to /lib)
- [ ] restrict presigned urls, add timeouts, restrict access keys, etc
- [ ] show meta data in gql\`type fileSources\`
- [ ] enable auth early on, dont forget created_by, updated_by, created_date fields
- [ ] create sharable code packages/object-store-client?
- [ ] create sharable code packages/database-client? client or functions
- [ ] lol iz works, read line from s3/minio
- [ ] fun feature, offer download same file but with comments in the last cells. (also with formatting ng red if error para cool kaso low prio)
- [ ] need a key reference (aside from index) for each file (to be able to cross check errors/results, etc)
- [ ] figure how to padd env vars to activities/workers
