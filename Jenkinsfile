pipeline {
    agent { docker { image 'node:12-alpine' } }
    stages {
        stage('Install Jest') {
            steps {
                sh 'npm install jest -g'
            }
        }

        stage('Install packages') {
            steps {
                sh 'npm install'
            }
        }

        stage('Units test') {
            steps {
                sh 'node node_modules/.bin/jest --runInBand'
            }
        }
    }
}
