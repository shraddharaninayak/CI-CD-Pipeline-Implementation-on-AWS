# 🚀 End-to-End CI/CD Pipeline Implementation on AWS (DevOps Project)

This project demonstrates an **end-to-end Continuous Integration and Continuous Deployment (CI/CD) pipeline** implemented on **AWS EC2 with Jenkins and Docker**.  
On every code push to **GitHub**, Jenkins automatically builds a Docker image, pushes it to **Docker Hub**, and deploys the latest container to the EC2 instance.  

🔗 **Live Demo:** http://<EC2_PUBLIC_IP>/  
            [http://13.127.136.206:5000/]
---

## 🏗️ Project Architecture
Developer (Local) → GitHub → Jenkins (on AWS EC2) → Docker Hub → AWS EC2 (Deployment)

---

## ⚙️ Tech Stack

- **AWS EC2** – Jenkins host + Docker runtime  
- **Jenkins** – CI/CD automation server  
- **Docker** – Containerization of Node.js application  
- **Docker Hub** – Image registry  
- **GitHub** – Source code repository & webhook integration  
- **Node.js + Express** – Simple web app  
- **Pipeline as Code** – Jenkinsfile  

---
## 📂 Project Structure
cicd-Project/
│-- index.js # Node.js app
│-- package.json # Dependencies
│-- Dockerfile # Containerization instructions
│-- docker-compose.yml # Optional, for local runs
│-- Jenkinsfile # CI/CD pipeline definition
│-- .gitignore
│-- README.md


---

## 🔄 CI/CD Workflow

1. **Developer changes code locally** → pushes to GitHub  
2. **Jenkins job triggers** (via GitHub webhook or Poll SCM)  
3. Jenkins stages:
   - **Checkout**: Pull latest code from GitHub  
   - **Build**: Create Docker image tagged with commit SHA  
   - **Push**: Push image to Docker Hub (latest + commit-tagged)  
   - **Deploy**: Stop old container, run new container on EC2  
4. **Application live** at `http://<EC2_PUBLIC_IP>/`  

---

## 🖥️ Setup Guide

### 1. Prerequisites
- AWS account  
- Docker Hub account  
- GitHub account  
- SSH key for EC2  

### 2. Launch EC2
- Ubuntu 22.04 LTS, t2.micro  
- Open inbound ports: **22 (SSH), 80 (HTTP), 8080 (Jenkins)**  
- Install Jenkins + Docker (see installation commands document separately)  

### 3. Configure Jenkins
- Install required plugins: Pipeline, GitHub, Docker Pipeline  
- Add Docker Hub credentials in Jenkins (`docker-hub-creds`)  
- Create a Pipeline job linked to GitHub repo with `Jenkinsfile`  

### 4. Test CI/CD
- Edit `index.js` (change message)  
- Commit & push to GitHub:  
  ```bash
  git add index.js
  git commit -m "Updated message for pipeline test"
  git push origin main
> Jenkins auto-triggers → new container deployed → verify in browser

📸 Screenshots
1.Architecture Diagram
Dev (Local) → GitHub → Jenkins (EC2) → Docker Hub → EC2 Container → Browser

<img width="640" height="509" alt="Architecture" src="https://github.com/user-attachments/assets/fbf0b3eb-9437-4468-b422-c373c5982590" />

2. GitHub Repository
<img width="1313" height="745" alt="Screenshot 2025-08-28 191602" src="https://github.com/user-attachments/assets/88a08836-fad0-474d-8b7b-845dab3e000d" />

3.Jenkins Pipeline Success
<img width="1365" height="517" alt="Screenshot 2025-08-28 184740" src="https://github.com/user-attachments/assets/8912c5e4-4ad6-4d3e-a5d2-d7d71a5470e7" />

4.Docker Hub Repository
<img width="1229" height="689" alt="Screenshot 2025-08-28 191405" src="https://github.com/user-attachments/assets/ea56b1d8-c330-4ec8-9b94-ddc787b7b8cf" />

5. Running Container on EC2

<img width="1846" height="416" alt="Screenshot 2025-08-28 191832" src="https://github.com/user-attachments/assets/025ef325-11e7-435e-86e0-04b036b9944e" />


<img width="919" height="486" alt="Screenshot 2025-08-28 193544" src="https://github.com/user-attachments/assets/dfcb0abd-1924-4f71-add0-8e4add1357a7" />


<img width="1890" height="179" alt="Screenshot 2025-08-28 193645" src="https://github.com/user-attachments/assets/1e9f732f-227b-412a-b49b-87999673f3ff" />
