## stack

- https://redwoodjs.com/
- https://temporal.io/
- https://min.io/
- https://github.com/sheetjs/sheetjs
- https://danfo.jsdata.org/

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
- [ ] think twice about storing JSON parsed big files (tested 25mb), not worth? think of how we'll use the stored jsonb, why store

# why store parsed file in DB

1. one reason is so we can inspect, issues might be related to serialization/deserialization from format to format, thing excel time field serialized to json becomes weird


# workflow definitions
wf definitions are modeled using code sdk, how do we make dynamic runs that looks like below

validate x10

## we could probably do something like
1. analyze file/s, spit out facts, line count, columns, dupes, min-max, etc etc
1. activity 1: read database for necessary steps, make an execution plan, return
2. in workflow: loop at execution plan, executing activities accordingly inside the plan
3. done?

### things to consider
1. we can only resume in the activity level, consider this when designing activities
2. use activity heartbeats for long processes


## notes
1. try to implement the source-sink pattern (or pumps), see https://github.com/agmen-hu/node-datapumps for inspiration
1. we get value in a common module to get file url (remote csv), as most libs operate in such manner

## activity
1. one could be someone that does something like, source-transform-sink
