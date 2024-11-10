pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-website'
        DOCKER_REGISTRY = 'prakashbhati086'
        DOCKER_CREDENTIALS_ID = 'docker-credentials-id'
        EC2_SSH_CREDENTIALS_ID = 'ec2-ssh-credentials' // ID of the SSH credentials in Jenkins
        EC2_IP = '18.205.23.36'  // EC2 instance IP
        EC2_USER = 'ubuntu'       
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
                    // SSH into the EC2 instance and deploy
                    sshagent(credentials: [EC2_SSH_CREDENTIALS_ID]) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_IP} 'docker pull ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest && docker stop my-website-container || true && docker rm my-website-container || true && docker run -d --name my-website-container -p 5555:80 ${DOCKER_REGISTRY.toLowerCase()}/${DOCKER_IMAGE.toLowerCase()}:latest'
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
