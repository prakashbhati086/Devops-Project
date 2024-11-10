pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-website'
        DOCKER_REGISTRY = 'prakashbhati086'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id' // Replace with your Jenkins Docker credentials ID
        EC2_CREDENTIALS_ID = 'ec2-ssh-credentials' // Use the credentials ID you've configured for EC2 SSH
        EC2_IP = '18.205.23.36'  // Replace with your EC2 instance IP
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

                    // Use the EC2 SSH credentials configured in Jenkins for SSH authentication
                    withCredentials([sshUserPrivateKey(credentialsId: EC2_CREDENTIALS_ID, keyFileVariable: 'PEM_FILE_PATH')]) {
                        // SSH into EC2 and pull the latest Docker image, stop and remove the old container, then run the new one
                        sh """
                        ssh -o StrictHostKeyChecking=no -i "\${PEM_FILE_PATH}" ubuntu@${EC2_IP} '
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
