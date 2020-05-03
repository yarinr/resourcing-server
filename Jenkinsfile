pipeline {
    environment {
        IMAGE_NAME = "gaya902008/resourcing-server:${BUILD_NUMBER}"
        DOCKERHUB_USER = "gaya902008"
        DOCKERHUB_PASS = credentials('dockerhub_pass')
        NAMESPACE = "diamond"
    }
    agent any
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Build Docker image and Push') {
            when { branch 'master' }
            steps {
                sh 'docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASS}'
                sh 'docker build -t ${IMAGE_NAME} .'
                sh 'docker push ${IMAGE_NAME}'
                sh 'docker rmi ${IMAGE_NAME}'
            }
        }
        stage('Deploy to Kubernetes') {
            when { branch 'master' }
            steps {
               withKubeConfig([credentialsId: 'kube_diamond_config']) {
                   // sh 'kubectl create namespace dummy-hello'
                   sh "sed -i 's/BUILDNUM/${BUILD_NUMBER}/g' k8s/DEPLOYMENT.yaml"
                   sh "kubectl apply -f k8s/DEPLOYMENT.yaml --namespace ${NAMESPACE}"
                   sh "kubectl apply -f k8s/SVC.yaml --namespace ${NAMESPACE}"
                   sh "kubectl apply -f k8s/INGRESS.yaml --namespace ${NAMESPACE}"
                }
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }

}
