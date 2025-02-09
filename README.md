# Blog CMS Platform

A Jekyll-based blog platform with a React CMS dashboard for content management.

## Architecture

```mermaid
gitGraph
    commit id: "initial"
    branch develop
    checkout develop
    commit id: "setup-jekyll"
    branch feature/cms-dashboard
    checkout feature/cms-dashboard
    commit id: "add-cms"
    checkout develop
    merge feature/cms-dashboard
    branch feature/github-actions
    checkout feature/github-actions
    commit id: "add-ci-cd"
    checkout develop
    merge feature/github-actions
    branch feature/testing
    checkout feature/testing
    commit id: "add-tests"
    checkout develop
    merge feature/testing
    checkout main
    merge develop
    commit id: "v1.0.0" tag: "v1.0.0"
```

## Features

- Jekyll-based static blog
- React CMS dashboard
- Firebase hosting
- Automated GitHub Actions workflows
- Docker containerization

## Development

### Prerequisites

- Ruby >= 2.7.0
- Node.js >= 14
- Docker (optional)

### Setup

1. Clone the repository
2. Install Jekyll dependencies:
   ```bash
   bundle install
   ```
3. Install CMS dashboard dependencies:
   ```bash
   cd cms-dashboard
   npm install
   ```

### Running locally

1. Start Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```
2. Start CMS dashboard:
   ```bash
   cd cms-dashboard
   npm start
   ```

### Docker

```bash
docker-compose up
```

## Testing

```bash
npm test
```

## Deployment

The site is automatically deployed to Firebase hosting when changes are pushed to the main branch.
