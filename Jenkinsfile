pipeline {
  agent any
  environment {
    CI = 'true'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Setup Node') {
      steps {
        sh 'node -v || true'
        sh 'npm --version || true'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Archive Reports') {
      steps {
        archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        archiveArtifacts artifacts: 'test-results/**', fingerprint: true
      }
    }
  }
  post {
    always {
      junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
      archiveArtifacts artifacts: 'playwright-report/**, videos/**, traces/**', fingerprint: true
    }
  }
}
