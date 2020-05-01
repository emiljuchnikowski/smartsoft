pipeline {
    agent { docker { image 'node:12-alpine' } }
    stages {
        stage('Install Jest') {
            steps {
                sh 'npm install jest'
            }
        }

        stage('Install packages') {
            steps {
                sh 'npm install'
            }
        }

        stage('Unit tests') {
            steps {
                sh 'node node_modules/.bin/jest --runInBand'
            }
        }
    }
}
