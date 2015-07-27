# Maintainer Guide

## Publishing a new version

1. Determine which part of the version you are about to increase.
   We follow the [Versioning & Semver](http://jscs.info/overview.html#versioning-semver) section from the JSCS project.
2. Run a bump script via npm. This will commit and tag the changed files:
    - `npm run bump` - will increase the patch version;
    - `npm run bump-minor` - will increase the minor version.
    - `npm run bump-major` - will increase the major version.
3. Push changes and tags: `git push --follow-tags`
4. Wait until the Travis-CI build finishes. It will publish a new version into npm.
   __DO NOT USE__ `npm publish`! If something goes wrong, Travis will tell us.
5. Done!
