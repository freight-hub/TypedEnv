const semverCompare = require('semver-compare')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const path = require('path')

async function shouldPublish () {
  const { version, name } = require(path.join(process.cwd(), 'package.json'))

  try {
    const versionResponse = await exec(`npm view ${name} version`)
    const publishedVersion = versionResponse.stdout.trim()

    return semverCompare(version, publishedVersion) >= 1;
  } catch (error) {
    if (error.stderr.indexOf('code E404') > -1) { // handle case that package was not published yet
      return true
    }

    throw error
  }
}

async function publish () {
  if (await shouldPublish()) {
    console.log('Start package publishing process...')

    await exec('npm publish --access=restricted')

    console.log('Package publishing process finished!')

    return
  }

  console.log('Package publishing not needed.')
}

publish()
