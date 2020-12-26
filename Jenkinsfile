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

        stage('Npm update') {
            withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
                sh 'NPM_TOKEN=$TOKEN npm run publish'
            }
        }

        stage('Git push') {
            sh 'git add .'
            sh 'git commit -m "build: npm publish'
            sh 'git push'
        }
    } catch (e) {
        // mark build as failed
        currentBuild.result = "FAILURE";

        // mark current build as a failure and throw the error
        throw e;
    }
}
