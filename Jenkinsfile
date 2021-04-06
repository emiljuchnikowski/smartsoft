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
            withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
                sh 'NPM_TOKEN=$TOKEN npm install --force'
            }
        }

//         stage('Unit tests') {
//             withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
//                 sh 'NPM_TOKEN=$TOKEN npm test -- --ci --testResultsProcessor="jest-junit"'
//                 junit 'junit.xml'
//             }
//         }

//         stage('Lint') {
//             withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
//                 sh 'NPM_TOKEN=$TOKEN npm run lint'
//             }
//         }

        stage('Npm update') {
            withCredentials([string(credentialsId: 'NpmToken', variable: 'TOKEN')]) {
                sh 'NPM_TOKEN=$TOKEN npm run publish'
            }
        }

        stage('Git push') {
            withCredentials([usernamePassword(credentialsId: 'github',
                                         usernameVariable: 'username',
                                         passwordVariable: 'password')]){
                sh("git add libs")
                sh('git commit -m "build: npm publish [skip ci]"')
                sh("git push https://$username:$password@github.com/emiljuchnikowski/smartsoft HEAD:master")
            }
        }
    } catch (e) {
        stage('Git push') {
            withCredentials([usernamePassword(credentialsId: 'github',
                                         usernameVariable: 'username',
                                         passwordVariable: 'password')]){
                sh("git add libs")
                sh('git commit -m "build: npm publish [skip ci]"')
                sh("git push https://$username:$password@github.com/emiljuchnikowski/smartsoft HEAD:master")
            }
        }

        // mark build as failed
        currentBuild.result = "FAILURE";

        // mark current build as a failure and throw the error
        throw e;
    }
}
