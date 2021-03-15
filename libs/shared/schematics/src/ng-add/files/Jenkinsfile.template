node {
    env.NODEJS_HOME = "${tool 'Node12'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

    def commit_id
    def tag_name
    def branch_name
    def portainerToken

    try {
        stage('Preparation') {
            checkout scm

            sh "git rev-parse --short HEAD > .git/commit-id"
            sh "git tag --points-at HEAD > .git/tag-name"

            commit_id = readFile('.git/commit-id').trim()
            tag_name = readFile('.git/tag-name').trim().replaceAll("_", ":")
            branch_name = sh(returnStdout: true, script: 'git name-rev --name-only HEAD').trim().replaceAll("remotes/origin/", "")

            println("COMMIT ID: " + commit_id)
            println("TAG NAME: " + tag_name)
            println("BRANCH NAME: " + branch_name)
        }

        stage('Install packages') {
            sh 'npm install'
        }

        stage('Unit tests') {
            sh 'npm test -- --ci --testResultsProcessor="jest-junit"'
            junit 'junit.xml'
        }

        stage('Lint') {
            sh 'npm run lint'
        }
    } catch (e) {
        // mark build as failed
        currentBuild.result = "FAILURE";

        // mark current build as a failure and throw the error
        throw e;
    }
}