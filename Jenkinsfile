pipeline {
  agent any

  stages {
   

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