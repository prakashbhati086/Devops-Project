pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'websiteimage'            
        EC2_IP = '3.84.133.159'                  
        CONTAINER_PORT = '80'                   
        PEM_FILE_PATH = '/var/lib/jenkins/.ssh/pemkeyweb.pem'  
        GIT_COMMIT_HASH = ""                     
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
                    GIT_COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    echo "Using commit hash: ${GIT_COMMIT_HASH}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${GIT_COMMIT_HASH}"
                    echo "Building image with tag: ${imageTag}"
                    sh "docker build -t ${imageTag} ."
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${GIT_COMMIT_HASH}"
                    echo "Pushing image with tag: ${imageTag}"
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                            docker push ${imageTag}
                        """
                    }
                }
            }
        }

        stage('Set PEM File Permissions') {
            steps {
                sh '''
                    if [ -f "${PEM_FILE_PATH}" ]; then
                        chmod 400 ${PEM_FILE_PATH}
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
                    def imageTag = "${DOCKER_USER}/${DOCKER_IMAGE}:${GIT_COMMIT_HASH}"
                    echo "Deploying with image tag: ${imageTag}"
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        ansiblePlaybook(
                            playbook: 'deploy.yml',
                            inventory: '/var/lib/jenkins/workspace/website@2/hosts',
                            extras: "-e docker_user=${DOCKER_USER} -e docker_pass=${DOCKER_PASS} -e git_commit_hash=${GIT_COMMIT_HASH}"
                        )
                    }
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
