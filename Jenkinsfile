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
                    env.GIT_COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    echo "Using commit hash: ${env.GIT_COMMIT_HASH}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        def imageTag = "${env.DOCKER_USER}/${env.DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                        echo "Building image with tag: ${imageTag}"
                        sh "docker build --no-cache -t ${imageTag} ."
                    }
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        def imageTag = "${env.DOCKER_USER}/${env.DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                        echo "Pushing image with tag: ${imageTag}"
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
                    withCredentials([usernamePassword(credentialsId: 'docker-credential', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        def imageTag = "${env.DOCKER_USER}/${env.DOCKER_IMAGE}:${env.GIT_COMMIT_HASH}"
                        echo "Deploying with image tag: ${imageTag}"
                        ansiblePlaybook(
                            playbook: 'deploy.yml',
                            inventory: '/var/lib/jenkins/workspace/website@2/hosts',
                            extras: "-e docker_user=${env.DOCKER_USER} -e docker_pass=${env.DOCKER_PASS} -e git_commit_hash=${env.GIT_COMMIT_HASH}"
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
