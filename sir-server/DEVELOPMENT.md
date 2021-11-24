# Development Guide

## Initial Requirements
- Github Development repository already created, configured and shared with dev team.
- User rules and policies for committing and pushing to the repository.

## Creating Features/Branches Instructions
 1. git clone <remote SIR repository>
    - `git clone https://github.com/AFC-Cohort-2-Serious-Incident-Report/SIR.git`
 2. git branch [to check which branch you are currently working on]
 3. git checkout -b <branch name> [to create and switch to a different branch]
    - `git checkout -b deployment` / or git switch <branch name>
 4. git branch [to check which branch you are currently working on]
 5. Develop your feature / story
 6. git status [to check the status of the current branch]
 7. git add . [to add all the files to the staging area]
 8. git commit -m "message" [to commit the changes to the staging area]
 9. git pull origin <branch name> [to pull the changes from the remote repository - main/master(which is development branch)]
    - `git pull origin development`
 10. git push origin <branch name> [to push the changes to your feature branch / remote repository(deployment branch)]
     - `git push origin deployment`
 11. send a pull request to the main/master branch in github for another pair to review, merge and push to the main/master branch (development branch)
     - https://github.com/AFC-Cohort-2-Serious-Incident-Report/SIR/pull/new/deployment [to development]
 12. git fetch <branch name> [to fetch the changes without committing from the remote repository(main/master branch)]
     - `git fetch development`
     - 