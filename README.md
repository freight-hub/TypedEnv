typed-env
========

[![CircleCI](https://circleci.com/gh/freight-hub/TypedEnv/tree/master.svg?style=svg&circle-token=5222e58e326cb399a02aa2ed524dcf0dd817282e)](https://circleci.com/gh/freight-hub/TypedEnv/tree/master)

Enforceable environment variable contracts at runtime. Use this library to make
sure all the environment variables used in a project are valid.


Usage
=====

To use the library, first declare a schema that consists of groups. A group is
a set of related environment variables that typically share a common prefix.
Groups are created using `envGroup` function that accepts a dictionary which
contains variable names and their types, e.g.:

    import * as typedEnv from '@freighthub/typed-env'

    const statsd = typedEnv.envGroup({
        HOST: NonEmptyString,
        PORT: PortNumber,
        PREFIX: NonEmptyString,
    }, 'STATSD')

    const schema = typedEnv.envSchema({
        statsd: statsd,
    })

In the above example `statsd` group will be used to load variables
 - `STATSD_HOST`
 - `STATSD_PORT`
 - `STATSD_PREFIX`

The optional `STATSD` prefix is passed as the second parameter to `envGroup`.
The schema is then created using `envSchema` function that accepts a dictionary
of groups.

To validate environment variables, make sure they're set (use `dotenv.config()`
to load .env if required). Then use loadFromEnv as follows:

    const env = typedEnv.loadFromEnv(schema)

If any variables are missing or don't pass type checking, an exception will occur.

Types
=====

typed-env provides the following schema types:

* Number - any number
* Integer - integer number
* PortNumber - integer number between 1 and 65535
* NonEmptyString - non-empty string of any length
* URI - URI as checked by valid-url
* Boolean - true or false

Example
=======

    import * as typedEnv from '@freighthub/typed-env'

    const schema = typedEnv.envSchema({
        elasticSearch: typedEnv.envGroup({
            URL: typedEnv.types.URI
        }, 'ELASTICSEARCH'),
    })

    const env = typedEnv.loadFromEnv(schema)
    console.log(env.elasticSearch.URL)
