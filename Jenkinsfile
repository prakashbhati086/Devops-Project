pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-website'
        DOCKER_REGISTRY = 'prakashbhati086'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/prakashbhati086/Devops-Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}").push("latest")
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    // Print Docker environment details for debugging
                    echo "Docker Registry: ${DOCKER_REGISTRY.toLowerCase()}"
                    echo "Docker Image: ${DOCKER_IMAGE.toLowerCase()}"

                    // Verify Docker version and path
                    bat 'docker --version'
                    bat 'echo %PATH%'

                    // Deploy the container to the server with lowercase variables
                    bat """
                    docker run -d -p 80:80 ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
