# Devops-Project
🎯 Project Overview

This project demonstrates a **complete DevOps automation pipeline** that takes a static website from development to production deployment using industry-standard tools and practices.

http://3.84.133.159/
![image](https://github.com/user-attachments/assets/d97e5f8e-8e88-4aa7-ad1b-ace7e15e9613)
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Development   │    │   CI/CD Pipeline │    │   Production    │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • VS Code       │───▶│ • Jenkins       │───▶│ • AWS EC2       │
│ • Windows WSL   │    │ • Docker        │    │ • nginx         │
│ • Git/GitHub    │    │ • Ansible       │    │ • Docker        │
│ • HTML/CSS/JS   │    │ • Docker Hub    │    │ • Public Web    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
Architecture Overview

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Development │───▶│ CI/CD Pipeline │───▶│ Production │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤
│ - Local Dev │ │ - Jenkins │ │ - AWS EC2 │
│ - Git/GitHub │ │ - Docker Build │ │ - Docker │
│ - HTML/CSS/JS │ │ - Automated Test│ │ - nginx │
│ - Version Control│ │ - Docker Hub │ │ - Public Access │
└─────────────────┘ │ - Ansible │ └─────────────────┘
text



## 🛠️ Technology Stack

### **Infrastructure & Tools**
- **☁️ Cloud Platform:** AWS EC2
- **🐳 Containerization:** Docker & Docker Hub
- **🔄 CI/CD:** Jenkins Pipeline
- **⚙️ Configuration Management:** Ansible
- **📁 Version Control:** Git & GitHub
- **🌐 Web Server:** nginx (Alpine Linux)

### **Development Tools**
- **💻 Environment:** Windows WSL2 Ubuntu
- **🎨 Frontend:** HTML5, CSS3, JavaScript
- **📝 Code Editor:** VS Code
- **🔧 Package Manager:** apt, pip

## 🚀 DevOps Pipeline Workflow

### **1. Development Phase**


Local development
git clone https://github.com/prakashbhati086/Devops-Project.git
cd Devops-Project

Make changes to website
git add .
git commit -m "Updated website content"
git push origin main




### **2. Automated CI/CD Pipeline**
When code is pushed to GitHub, Jenkins automatically:

1. **🔄 Source Code Checkout**
   - Pulls latest code from GitHub
   - Generates unique commit hash for versioning

2. **🐳 Docker Image Build**
   - Creates containerized application
   - Tags with commit hash and 'latest'
   - Uses nginx:alpine for lightweight deployment

3. **🧪 Automated Testing**
   - Runs container locally on test port
   - Validates HTTP response
   - Ensures application functionality

4. **📦 Image Registry**
   - Pushes Docker image to Docker Hub
   - Maintains version history
   - Enables rollback capabilities

5. **🚀 Automated Deployment**
   - Uses Ansible for infrastructure automation
   - Deploys to AWS EC2 instance
   - Manages container lifecycle
   - Ensures zero-downtime deployment

6. **✅ Health Validation**
   - Verifies website accessibility
   - Confirms successful deployment
   - Provides deployment status

## 📋 Prerequisites

### **Local Environment Setup**



### **AWS Infrastructure**
- AWS EC2 instance (Ubuntu 22.04 LTS)
- Security Group: Allow HTTP (80), SSH (22)
- Key Pair for SSH access
- Elastic IP (optional, for consistent access)

### **Accounts & Access**
- GitHub account with repository
- Docker Hub account for image registry
- AWS account with EC2 access

## ⚙️ Configuration Files

### **Dockerfile**




## 🎯 Key Achievements

✅ **Fully Automated Deployment** - Zero manual intervention  
✅ **Infrastructure as Code** - Reproducible environments  
✅ **Containerized Application** - Consistent deployments  
✅ **Version Control Integration** - Git-based workflow  
✅ **Cloud Infrastructure** - Scalable AWS deployment  
✅ **Professional DevOps Practices** - Industry standards  

## 🚀 Future Enhancements

- [ ] **Kubernetes Orchestration** - Container orchestration
- [ ] **Multi-Environment** - Dev/Staging/Production pipeline
- [ ] **Terraform Integration** - Infrastructure provisioning
- [ ] **Monitoring Stack** - Prometheus + Grafana
- [ ] **SSL/HTTPS** - Let's Encrypt integration
- [ ] **Database Integration** - Persistent data storage
- [ ] **Blue-Green Deployments** - Zero-downtime deployments

## 📝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit Pull Request

## 📞 Contact & Support

- **GitHub:** [@prakashbhati086](https://github.com/prakashbhati086)
- **Email:** prakashbhati086@example.com
- **LinkedIn:** [Your LinkedIn Profile]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/prakashbhati086/Devops-Project)
![GitHub Forks](https://img.shields.io/github/forks/prakashbhati086/Devops-Project)
![GitHub Issues](https://img.shields.io/github/issues/prakashbhati086/Devops-Project)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/prakashbhati086/Devops-Project)

**⭐ If this project helped you learn DevOps, please give it a star!**

---

### 🏆 **From Code to Cloud in Minutes - This is Modern DevOps!** 🏆
