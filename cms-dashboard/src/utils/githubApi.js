import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN
});

const owner = 'sivolko';
const repo = 'blog-cms-platform';

export async function createPost(post) {
  const branch = `post/${post.title.toLowerCase().replace(/\s+/g, '-')}`;
  const path = `_posts/${new Date().toISOString().split('T')[0]}-${post.title.toLowerCase().replace(/\s+/g, '-')}.md`;

  // Create a new branch
  const mainRef = await octokit.git.getRef({
    owner,
    repo,
    ref: 'heads/main'
  });

  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branch}`,
    sha: mainRef.data.object.sha
  });

  // Create the post file
  const content = `---
title: ${post.title}
status: ${post.status}
tags: ${post.tags.join(', ')}
featuredImage: ${post.featuredImage}
---

${post.content}`;

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `feat(post): Add ${post.title}`,
    content: Buffer.from(content).toString('base64'),
    branch
  });

  // Create pull request
  return octokit.pulls.create({
    owner,
    repo,
    title: `Post: ${post.title}`,
    head: branch,
    base: 'main',
    body: 'Add new blog post'
  });
}

export async function updatePost(id, post) {
  // Similar to createPost but updates existing file
  // and creates a new PR
}

export async function getPost(id) {
  // Fetch post content from GitHub
}

export async function uploadImage(file) {
  // Upload image to GitHub repository and return URL
}
