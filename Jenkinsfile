pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t backend:prod .'
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker run -p 3003:3003 backend:prod'
      }
    }
  }
}
