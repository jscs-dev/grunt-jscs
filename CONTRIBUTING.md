# Contributing to this project

## Using the Issue Tracker

Use the issue tracker for bug reports, feature requests and pull requests; but please follow these restrictions:

* Don't use it for personal support requests. [StackOverflow](http://stackoverflow.com/) is a great community that has exactly this purpose.
* Keep the conversation on-topic. Please don't go troll there.

## Pull Requests

We appreciate any code contribution, they're welcome! However, we'd like you to follow some conventions:

### Commits
* [Keep the first line of the message short](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html). If you have more to describe about that commit, do it from the second line.
* Have you finished adding commits? Please squash the PR.

### Testing
Be sure to __always__ test your code. This is very important to ensure that it will always work. We currently use [nodeunit](https://github.com/caolan/nodeunit) as our test framework.

### Code style
Follow jQuery [code style](http://contribute.jquery.org/style-guide/js/) guide, with two exception:

1. max is 100 chars per line
2. 4 spaces for indentation

but don't worry much about it, JSCS will catch most of it.
