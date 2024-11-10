pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-website'
        DOCKER_REGISTRY = 'prakashbhati086'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
        EC2_IP = '18.205.23.36'  // EC2 instance IP
        EC2_USER = 'ubuntu'       // EC2 SSH username
        PRIVATE_KEY_PATH = 'E:/software/websitekey.pem' // Correct path to the PEM file
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

        stage('Deploy to EC2 Server') {
            steps {
                script {
                    // Use 'bat' instead of 'sh' for Windows
                    bat """
                        echo Deploying Docker container to EC2...
                        ssh -o StrictHostKeyChecking=no -i "${PRIVATE_KEY_PATH}" ubuntu@${EC2_IP} 'docker pull ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest && docker stop my-website-container || true && docker rm my-website-container || true && docker run -d --name my-website-container -p 5555:80 ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest'
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
