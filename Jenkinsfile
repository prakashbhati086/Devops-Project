pipeline {
    agent any

    environment {
        // Define environment variables
        DOCKER_IMAGE = 'my-website'
        DOCKER_REGISTRY = 'prakashbhati086'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'  // Jenkins Docker credentials ID
        EC2_CREDENTIALS_ID = 'ec2-ssh-credentials'    // Jenkins EC2 credentials ID
        EC2_IP = '18.205.23.36'                           // Replace with your EC2 instance IP
        PEM_FILE_PATH = 'E:/software/websitekey.pem'      // Path to your PEM file for EC2
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository containing the Dockerfile and source code
                git branch: 'main', url: 'https://github.com/prakashbhati086/Devops-Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image from the Dockerfile in the repository
                    docker.build("${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Authenticate and push the built Docker image to Docker Hub
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
                    
                    // SSH into the EC2 instance and deploy the Docker container
                    withCredentials([sshUserPrivateKey(credentialsId: EC2_CREDENTIALS_ID, keyFileVariable: 'PEM_FILE_PATH')]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no -i "\${PEM_FILE_PATH}" ubuntu@${EC2_IP} '
                            docker pull \${DOCKER_REGISTRY.toLowerCase()}/\${DOCKER_IMAGE.toLowerCase()}:latest && 
                            docker stop my-website-container || echo "Container not running" && 
                            docker rm my-website-container || echo "Container not found" && 
                            docker run -d --name my-website-container -p 80:80 \${DOCKER_REGISTRY.toLowerCase()}/\${DOCKER_IMAGE.toLowerCase()}:latest
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
