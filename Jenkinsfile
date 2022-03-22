pipeline{
    environment {
        COMPOSE_FILE = "docker-compose.yaml"
        PATH = "$PATH:/usr/local/bin"
        registryCredential = "dockerhub_credentials"
        imagenameback = "oussama24/users-app_backend:latest"
        dockerImageback = 'backendapp'
        imagenamefront = "oussama24/users-app_frontend:latest"
        dockerImagefront = 'frontendapp'
        imagenamemongo = "oussama24/mongo:latest"
        dockerImagemongo = 'mongo'
//         scannerHome = tool name: 'sonarqube-scanner'
    }
    agent any
    stages{
        
        stage('Cloning Git') {
            steps {
                git 'https://github.com/oussama24bessaad/Users-App'
            }
        }

          
//         stage("test-sonar"){
//             steps{
//                 script {
//                     withSonarQubeEnv("sonarQube") {
//                     sh "${scannerHome}/bin/sonar-scanner \
//                         -Dsonar.projectKey=oussama \
//                         -Dsonar.sources=. \
//                         -Dsonar.host.url=https://sonarqube.projectcloud.click/ \
//                         -Dsonar.login=admin \
//                         -Dsonar.password=admin"
//                     } 
//                 }
//             }
//         } 
        
        stage('SonarQube analysis') {
                    
           steps{
               script {
              scannerHome = tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                   withSonarQubeEnv('sonarqube-server') { 
        
                      sh "${scannerHome}/bin/sonar-scanner"
                     
                   }
               }         
           }
       }
        stage("Build and start images") {
            steps {
                sh 'cd FrontendApp && npm install'
                sh 'cd BackendApp && npm install'
                sh 'docker --version'
                sh "docker-compose build"
                sh "docker-compose up -d"
            }
        }

        // stage("build"){
            
        //     steps{
        //         sh 'npm install'
        //         sh 'docker --version'
        //     }
        // }
      
        stage("docker-build"){
            steps{  
                    
                    script {
                    // dockerImageback = docker.build imagenameback   
                    docker.withRegistry( '', registryCredential ) {
                    dockerImageback.push("$BUILD_NUMBER")
                    dockerImageback.push('latest')
                    }
                    }
                    script {
                    // dockerImagefront = docker.build imagenamefront   
                    docker.withRegistry( '', registryCredential ) {
                    dockerImagefront.push("$BUILD_NUMBER")
                    dockerImagefront.push('latest')
                    }
                }
                    script {
                    // dockerImagemongo = docker.build imagenamemongo  
                    docker.withRegistry( '', registryCredential ) {
                    dockerImagemongo.push("$BUILD_NUMBER")
                    dockerImagemongo.push('latest')
                    }
                }
            }
        }
        stage('Deploy App') {
    steps {
        withCredentials([
            string(credentialsId: 'my_kubernetes', variable: 'api_token')
            ]) {
             sh 'kubectl --token $api_token --server https://192.168.49.2:8443 --insecure-skip-tls-verify=true apply -f ./Kubernetes '
            // sh 'kubectl --token $api_token --server https://192.168.49.2:8443 --insecure-skip-tls-verify=true exec -i -t secret-pod -- /bin/bash '
               }
            }
           }
    }
}