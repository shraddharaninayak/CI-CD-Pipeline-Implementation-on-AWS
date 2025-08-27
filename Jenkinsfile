pipeline {
  agent any
  environment {
    DOCKER_CREDS = 'docker-hub-creds' // set this in Jenkins credentials
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          SHORT_COMMIT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        }
      }
    }
    stage('Build & Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "docker build -t $DOCKER_USER/cicd-demo:${SHORT_COMMIT} ."
          sh "docker push $DOCKER_USER/cicd-demo:${SHORT_COMMIT}"
          sh "docker tag $DOCKER_USER/cicd-demo:${SHORT_COMMIT} $DOCKER_USER/cicd-demo:latest"
          sh "docker push $DOCKER_USER/cicd-demo:latest"
        }
      }
    }
    stage('Deploy') {
      steps {
        // stop old container and run the new image
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            docker logout || true
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            if [ "$(docker ps -q -f name=cicd-demo)" != "" ]; then
              docker stop cicd-demo || true
              docker rm cicd-demo || true
            fi
            docker run -d --name cicd-demo -p 80:3000 $DOCKER_USER/cicd-demo:latest
          '''
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout || true'
    }
  }
}
