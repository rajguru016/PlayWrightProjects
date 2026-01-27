pipeline {
    agent any

    tools {
        nodejs 'NodeJS25'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Verify Node') {
            steps {
                sh '''
                  which node
                  node -v
                  npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
