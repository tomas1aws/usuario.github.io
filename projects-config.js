// ============================================================================
// CONFIGURACIÓN DE PROYECTOS - PORTFOLIO PROFESIONAL
// ============================================================================

const projects = [
    {
        id: 1,
        title: "Aplicación Web con Angular desplegada en AWS",
        description: "Muestra cómo servir sitios web estáticos o SPA en la nube",
        fullDescription: "Sitio web estático Angular alojado en Amazon S3, distribuido globalmente con CloudFront y protegido con HTTPS mediante AWS Certificate Manager.",
        image: "imagenes/App_Web_Desplegada_AWS.jpg",
        technologies: ["Angular", "Amazon S3", "CloudFront", "Route 53", "Certificate Manager"],
        tags: ["Básico"]
    },
    {
        id: 2,
        title: "Proyecto de Tenis - Sistema de Socios",
        description: "Aplicación para gestión de socios de un club de tenis, desplegada en Kubernetes",
        fullDescription: "Capstone project: Desarrollo de una aplicación para administrar socios de un club de tenis. El backend se empaquetó en Docker, se publicó en DockerHub y se desplegó en un clúster de Kubernetes con Minikube. Incluye manifiestos de Kubernetes (Deployment, Service, Namespace) y un pipeline de despliegue manual.",
        image: "imagenes/Seguimiento_Ubicacion.jpg",
        technologies: ["Docker", "Kubernetes", "Minikube", "YAML", "Node.js"],
        tags: ["Avanzado"]
    },
    {
        id: 3,
        title: "Docker en AWS",
        description: "Contenedores Docker desplegados en la nube con servicios de AWS",
        fullDescription: "Aplicación dockerizada desplegada en servicios de AWS. Incluye integración con Amazon ECR para imágenes, y despliegue gestionado con servicios en la nube.",
        image: "imagenes/Terraform_AWS.jpg",
        technologies: ["Docker", "Amazon ECR", "EC2", "VPC"],
        tags: ["Avanzado"]
    },
    {
        id: 4,
        title: "Kubernetes en AWS",
        description: "CI/CD, despliegue con contenedores y uso de múltiples lenguajes y tecnologías",
        fullDescription: "Aplicación distribuida en clúster de Kubernetes gestionado con múltiples APIs backend en contenedores, base de datos MongoDB y servicios de AWS.",
        image: "imagenes/Kubernetes_AWS.jpg",
        technologies: ["Angular", "Docker", "Amazon ECR", "MongoDB", "Amazon SES", "Minikube"],
        tags: ["Profesional"]
    }
];

// Exportar para uso en script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects };
}
