stage('Deploy to EC2') {
    steps {
        sshagent(['ec2-ssh-credentials']) {
            script {
                echo "Testing SSH and Docker commands on EC2 instance..."

                // Direct SSH and Docker command for testing
                sh """
                ssh -o StrictHostKeyChecking=no ubuntu@18.205.23.36 << 'EOF'
                echo "Connected to EC2 successfully!"
                docker --version  # Check Docker version
                EOF
                """
            }
        }
    }
}
