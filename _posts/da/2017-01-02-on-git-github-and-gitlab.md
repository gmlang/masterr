---
layout: post
title: "On Git, Github and Gitlab"
date: 2017-01-02 
comments: true
categories: da
keywords: "git, github, gitlab, da mondays, data science project management"
published: true
share: true
ads: true

---

If you want to become a data scientist, you need to learn how to use git, github and gitlab. They are good for project storage, backup and collaboration. I'm going to give you a fairly detailed list of instructions on how to set them up in this post.

## Installation
1. [Sign up for Github](http://happygitwithr.com/github-acct.html)
2. [Install Git](http://happygitwithr.com/install-git.html)
3. [Introduce yourself to Git](http://happygitwithr.com/hello-git.html). Make sure you **ignore** 8.1.
4. [Pick a Git client](http://happygitwithr.com/git-client.html). I use SourceTree.
5. [Connect to Github](http://happygitwithr.com/push-pull-github.html). The link shows you how to do it using the shell. You should also learn how to do it using the git client you picked. The reason is that you rarely need to go back to the shell once you master a git client.
6. [Check for existing SSH keys](http://happygitwithr.com/ssh-keys.html#check-for-existing-keys)
7. If you don't have one, [create SSH keys from the shell and add the public key to Github](http://happygitwithr.com/ssh-keys.html#set-up-from-the-shell)
8. [Sign up for Gitlab](https://gitlab.com)
9. [Add the same public key (see step 6 and 7) to Gitlab](https://docs.gitlab.com/ee/gitlab-basics/create-your-ssh-keys.html). Afterwards, you can clone Gitlab repos using SourceTree. 
10. If you have two github accounts, for example, one for personal use and the other for your organization, you need to have two sets of SSH keys in order to manage your repos in both accounts using SourceTree on the same computer. Click [here](https://gist.github.com/jexchan/2351996) to learn how to set them up.

## Work flow when starting a new project (I'm using Gitlab here, but the same logic also holds for Github)
1. Go to [Gitlab](https://gitlab.com) and make sure you are logged in.
2. Click the big PLUS (**+**) button next to your profile picture to create a new project. 
3. After you've created a new project, you've created a repo. You should see a screen like this under the **Project** tab

![](/images/gitlab.png)

4. Copy the SSH path shown in the screen.
5. Open SourceTree, click **New Repository -> Clone from URL**.
6. Paste the copied SSH path into the Source URL field.
7. Specify the Destination Path and Name.
8. Click **Clone**.
Now, you can [stage, commit, push and pull from SourceTree](https://confluence.atlassian.com/sourcetreekb/commit-push-and-pull-a-repository-on-sourcetree-785616067.html). If you are using a different git client, make sure you learn how to do these actions. Some tutorials teach you to do them inside Rstudio. **Don't do that**. Let me repeat: **"Don't waste the effort connecting git/github with RStudio. Not worthy it."** Instead,  use a git client (I prefer SourceTree). Leave the job of connecting git and a git hosting service (for example: github, gitlab, bitbucket) exclusively to a git client.

## Ignore files
You don't want to use git to track everything. You only want to track your code. For example, you don't want to track files like .Rhistory, .Rapp.history and .Rproj.user/*. 

1. [How to create .gitignore file](http://stackoverflow.com/questions/12501324/how-to-use-gitignore-command-in-git)

## Work flow when collaborating on Github
Let's demo the work flow using the following example. 

1. [Fork my repo](https://github.com/gmlang/test) (Upper right corner fork button)
2. You'll see the same repo show up under your github account. [Clone it using source tree](https://confluence.atlassian.com/sourcetreekb/clone-a-repository-into-sourcetree-780870050.html).
3. [Add upstream](http://stackoverflow.com/questions/13273852/how-do-i-update-my-forked-repo-using-sourcetree). This allows you to update your repo based on my updates. Once you add upstream, you can pull the changes I make directly to your local repo.
4. Make changes to your local copy and commit and push to the repo in your github account.
5. [Create a pull request](https://yangsu.github.io/pull-request-tutorial/). 
6. I'll review your pull request and decide if to merge with mine.


## Exercises
1. [Understand git and git hosting services from the big picture level](http://happygitwithr.com/big-picture.html).
2. [Clone a repo](http://happygitwithr.com/clone.html).
3. [Fork a repo](http://happygitwithr.com/fork.html). [A specific fork and pull practice](http://happygitwithr.com/bingo.html).
4. Mistakes Recovery: [part1](http://happygitwithr.com/burn.html), [part2](http://happygitwithr.com/reset.html).

## Beyond 
1. [How to branch](https://barro.github.io/2016/02/a-succesful-git-branching-model-considered-harmful/).
2. [Learn Git branching](http://learngitbranching.js.org) (animated).
3. [A Git workflow walkthrough series](http://vallandingham.me/git-workflow.html).
4. [Git tutorial on Atlassian](https://www.atlassian.com/git/tutorials/).
5. [Github training](https://services.github.com/kit/)
6. [A minimal command line git tutorial](http://kbroman.org/github_tutorial/).