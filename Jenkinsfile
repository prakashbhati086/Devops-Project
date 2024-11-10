pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-website'
        DOCKER_REGISTRY = 'prakashbhati086'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id' // Replace with your Jenkins Docker credentials ID
        EC2_IP = '18.205.23.36'  // Replace with your EC2 instance IP
        PEM_FILE_PATH = 'E:/software/websitekey.pem' // Full path to your PEM file
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

        stage('Deploy to EC2') {
            steps {
                script {
                    echo "Deploying Docker container to EC2..."
                    sh """
                    ssh -o StrictHostKeyChecking=no -i "${PEM_FILE_PATH}" ubuntu@${EC2_IP} '
                        docker pull ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest && 
                        docker stop my-website-container || echo "Container not running" && 
                        docker rm my-website-container || echo "Container not found" && 
                        docker run -d --name my-website-container -p 80:80 ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment to EC2 successful!'
        }
        failure {
            echo 'Deployment to EC2 failed.'
        }
    }
}
