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
                    // Get the short Git commit hash
                    env.GIT_COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    echo "Using commit hash: ${env.GIT_COMMIT_HASH}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image with the commit hash as a tag
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        def imageTag = "${env.DOCKER_USER}/${env.DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                        echo "Building Docker image with tag: ${imageTag}"
                        sh "docker build --no-cache -t ${imageTag} ."
                    }
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Log in and push the Docker image to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        def imageTag = "${env.DOCKER_USER}/${env.DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                        echo "Pushing image to Docker Hub with tag: ${imageTag}"
                        sh """
                            docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PASS}
                            docker push ${imageTag}
                        """
                    }
                }
            }
        }

        stage('Set PEM File Permissions') {
            steps {
                script {
                    // Ensure that the PEM file has the correct permissions
                    def pemFile = '/var/lib/jenkins/.ssh/pemkeyweb.pem'
                    if (fileExists(pemFile)) {
                        echo "Setting PEM file permissions..."
                        sh "sudo chmod 400 ${pemFile}"
                    } else {
                        error "PEM file not found at ${pemFile}"
                    }
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                script {
                    // Deploy using Ansible Playbook
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        def imageTag = "${env.DOCKER_USER}/${env.DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                        echo "Deploying with image tag: ${imageTag}"
                        ansiblePlaybook(
                            playbook: 'deploy.yml',
                            inventory: '/var/lib/jenkins/workspace/website@2/hosts',
                            extraVars: [
                                docker_user: "${DOCKER_USER}",
                                docker_pass: "${DOCKER_PASS}",
                                git_commit_hash: "${GIT_COMMIT_HASH}",
                                pem_file_path: "${PEM_FILE_PATH}"
                            ]
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
