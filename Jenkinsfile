pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'websiteimage'            
        EC2_IP = '34.239.123.37'                  
        CONTAINER_PORT = '80'                   
        PEM_FILE_PATH = '/var/lib/jenkins/.ssh/deploy.pem'  
        DOCKER_CREDENTIALS = credentials('docker-credential')  
        DOCKER_USER = "${DOCKER_CREDENTIALS_USR}"               
        DOCKER_PASS = "${DOCKER_CREDENTIALS_PSW}"               
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
                sh 'ls -la'
            }
        }
    }
        stage('Set Commit Hash') {
            steps {
                script {
                    env.GIT_COMMIT_HASH = sh(
                        script: "git rev-parse --short HEAD", 
                        returnStdout: true
                    ).trim()
                    echo "Using commit hash: ${env.GIT_COMMIT_HASH}"
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                    echo "Building image with tag: ${imageTag}" 
                    
                    sh """
                        docker build -t ${imageTag} .
                        docker tag ${imageTag} ${DOCKER_USER}/${DOCKER_IMAGE}:latest
                        echo "✅ Docker image built successfully!"
                    """
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                    echo "Pushing image to Docker Hub..." 
                    
                    sh """
                        echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin
                        docker push ${imageTag}
                        docker push ${DOCKER_USER}/${DOCKER_IMAGE}:latest
                        echo "✅ Images pushed to Docker Hub successfully!"
                    """
                }
            }
        }
        
       stage('Deploy with Ansible') {
    steps {
        script {
            def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
            echo "Deploying to EC2 with Ansible..."
            
            sh """
                sudo ansible-playbook deploy.yml \\
                    -i hosts.ini \\
                    -e ansible_host_key_checking=False \\
                    -e docker_user=${DOCKER_USER} \\
                    -e docker_pass=${DOCKER_PASS} \\
                    -e git_commit_hash=${env.GIT_COMMIT_HASH} \\
                    -v
            """
        }
    }
}

    
    post {
        always {
            sh 'docker system prune -f && docker logout'
        }
        success {
            echo '🎉 DEPLOYMENT SUCCESSFUL!'
            echo "🌐 Your website: http://${EC2_IP}"
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
