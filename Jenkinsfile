pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-website'
        DOCKER_REGISTRY = 'prakashbhati086'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'  // Docker credentials ID
        EC2_SSH_CREDENTIALS = 'ec2-ssh-credentials'  // SSH credentials ID for EC2
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
                sshagent([EC2_SSH_CREDENTIALS]) {
                    script {
                        echo "Deploying to EC2 instance..."

                        // SSH into EC2 and pull the latest image
                        sh """
                        ssh -o StrictHostKeyChecking=no -i "E:/software/websitekey.pem" ubuntu@18.205.23.36 << 'EOF'
                        docker pull ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest
                        docker stop my-website-container || true
                        docker rm my-website-container || true
                        docker run -d -p 5555:80 --name my-website-container ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest
                        EOF
                        """
                    }
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
