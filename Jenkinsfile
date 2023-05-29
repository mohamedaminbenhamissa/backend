pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        // Checkout source code from version control (e.g., Git)
        git 'https://github.com/mohamedaminbenhamissa/backend.git'
        
        // Install dependencies
        sh 'npm install'
      }
    }
    
    stage('Test') {
      steps {
        // Run tests
        sh 'npm test'
      }
    }
    
    stage('Build Artifact') {
      steps {
        // Generate production-ready build artifacts
        sh 'npm run build'
      }
    }
    
    stage('Deploy') {
      steps {
        // Perform deployment to your target environment
        // Replace the below command with your deployment script or tool
        sh 'npm run deploy'
      }
    }
  }
}
