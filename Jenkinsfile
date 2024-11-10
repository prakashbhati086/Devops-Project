pipeline {
    agent any

    environment {
        EC2_CREDENTIALS_ID = 'your-ec2-credentials-id'
        EC2_IP = '18.205.23.36'  // Replace with your actual EC2 IP
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE = 'prakashbhati086/my-website'
    }

    stages {
        stage('Deploy Docker Container') {
            steps {
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
