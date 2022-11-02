# Contributing

Glad to see you want to contribute to this project!

## About this project 

A music player API for mysic, built with NodeJS & MongoDB. Features include authentication & streaming music.

## Contents

- [Setup this project](#setup-project)

- [Setup Installation](#setup-installation)

- [Push your changes and make a Pull Request](#push-your-changes-and-make-a-pull-request)

- [Report a bug/request a feature](#follow-these-steps-to-report-a-bugrequest-a-feature)
---

## Setup Project

To start contributing, follow the below guidelines:

1. Fork [this](https://github.com/amos-kibet/mysic-api/fork) repository.

2. Clone your forked copy of the project.

   ```
   git clone https://github.com/<your_username>/mysic-api.git
   ```

3. Navigate to the directory `mysic-api` .

   ```
   cd mysic-api
   ```

4. Add a reference (remote) to the original repository.

   ```
   git remote add upstream https://github.com/amos-kibet/mysic-api.git
   ```

5. Check the remotes for this repository.

   ```
   git remote -v
   ```

6. Always take a pull from the upstream repository to your main branch to keep it up to date with the main project (updated repository).

   ```
   git pull upstream main
   ```

7. Create a new branch.

   ```
   git checkout -b <your_branch_name>
   ```

## Setup Installation 

Rename the file named `.env.example` to `.env` and update the variable values with valid ones

Install the required dependencies with

```sh
yarn install
```

Start the app with

```sh
yarn start
```

You can also start it in watch mode with

```sh
yarn run start:dev
```


## Push your changes and make a Pull Request

1. Track your changes ✔.

    ```
    git add .
    ```

2. Commit your changes.

    ```
    git commit -m "Relevant message"
    ```

3. Push the committed changes in your feature branch to your remote repo.

    ```
    git push -u origin <your_branch_name>
    ```

4. To create a pull request, click on `Compare & pull requests`.

5. Add appropriate title and description to your pull request explaining your changes and efforts done.

6. Click on `Create pull request`.

7. Voilà! You have made a PR to mysic-api 💥. Wait for your submission to be accepted and your PR to be merged.



### Follow these steps to report a bug/request a feature

- Head over to [issues](https://github.com/amos-kibet/mysic-api/issues) tab.
- Click on `New issue` in top right corner.
- Fill out the details.
- Click on `Submit new issue`.

#### Things to keep in mind while reporting a bug/issue

A good bug report shouldn't leave others needing to chase you up for more information.
Please try to be as detailed as possible in your report.

- What is your environment?
- What steps will reproduce the issue?
- What browser(s) and OS experience the problem?
- What would you expect to be the outcome?
- Provide adequate screenshots/log for the bug.

All these details will help developers to fix any potential bugs.

#### Things to keep in mind while creating a feature request

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project.
It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.