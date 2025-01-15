pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'websiteimage'            
        EC2_IP = '54.82.32.221'                  
        CONTAINER_PORT = '80'                   
        PEM_FILE_PATH = '/var/lib/jenkins/.ssh/pemkeyweb.pem'  
        DOCKER_CREDENTIALS = credentials('docker-credential')  
        DOCKER_USER = "${DOCKER_CREDENTIALS_USR}"               
        DOCKER_PASS = "${DOCKER_CREDENTIALS_PSW}"               
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout([ 
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/prakashbhati086/Devops-Project.git',
                        credentialsId: 'github-username-password'
                    ]]
                ])
            }
        }
        stage('Set Commit Hash') {
            steps {
                script {
                   
                    env.GIT_COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    echo "Using commit hash: ${env.GIT_COMMIT_HASH}"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                    echo "Building image with tag: ${imageTag}" 
                    sh "docker build -t ${imageTag} ."
                }
            }
        }
        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                    echo "Pushing image with tag: ${imageTag}" 
                    sh """
                        echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin
                        docker push ${imageTag}
                    """
                }
            }
        }
        stage('Set PEM File Permissions') {
            steps {
                sh '''
                    if [ -f "${PEM_FILE_PATH}" ]; then
                       sudo chmod 400 ${PEM_FILE_PATH}
                    else
                        echo "PEM file not found at ${PEM_FILE_PATH}"
                        exit 1
                    fi
                '''
            }
        }
        stage('Run Ansible Playbook') {
            steps {
                script {
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                    echo "Deploying with image tag: ${imageTag}"  
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: '/var/lib/jenkins/workspace/website@2/hosts',
                        extras: "-e docker_user=${DOCKER_USER} -e docker_pass=${DOCKER_PASS} -e git_commit_hash=${env.GIT_COMMIT_HASH}"
                    )
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Check the logs for details.'
        }
    }
}
