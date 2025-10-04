// ============================================================================
// CONFIGURACIÓN DE PROYECTOS - PORTFOLIO PROFESIONAL
// ============================================================================

const projects = [
    {
        id: 1,
        title: "Aplicación Web con Angular desplegada en AWS",
        description: "Muestra cómo servir sitios web estáticos o SPA en la nube",
        fullDescription: "Sitio web estático Angular alojado en Amazon S3, distribuido globalmente con CloudFront y protegido con HTTPS mediante AWS Certificate Manager.",
        technologies: ["Angular", "Amazon S3", "CloudFront", "Route 53", "Certificate Manager"],
        iconClass: "fa-solid fa-cloud-arrow-up",
        iconBackground: "linear-gradient(135deg, rgba(37, 99, 235, 0.85), rgba(6, 182, 212, 0.75))",
        iconColor: "rgba(224, 242, 254, 0.95)"
    },
    {
        id: 2,
        title: "Proyecto de Tenis - Sistema de Socios",
        description: "Aplicación para gestión de socios de un club de tenis, desplegada en Kubernetes",
        fullDescription: "Capstone project: Desarrollo de una aplicación para administrar socios de un club de tenis. El backend se empaquetó en Docker, se publicó en DockerHub y se desplegó en un clúster de Kubernetes con Minikube. Incluye manifiestos de Kubernetes (Deployment, Service, Namespace) y un pipeline de despliegue manual.",
        technologies: ["Docker", "Kubernetes", "Minikube", "YAML", "Node.js"],
        iconClass: "fa-solid fa-table-tennis-paddle-ball",
        iconBackground: "linear-gradient(135deg, rgba(124, 58, 237, 0.8), rgba(236, 72, 153, 0.65))",
        iconColor: "rgba(250, 250, 255, 0.95)"
    },
    {
        id: 3,
        title: "Docker en AWS",
        description: "Contenedores Docker desplegados en la nube con servicios de AWS",
        fullDescription: "Aplicación dockerizada desplegada en servicios de AWS. Incluye integración con Amazon ECR para imágenes, y despliegue gestionado con servicios en la nube.",
        technologies: ["Docker", "Amazon ECR", "EC2", "VPC"],
        iconClass: "fa-brands fa-docker",
        iconBackground: "linear-gradient(135deg, rgba(14, 165, 233, 0.85), rgba(59, 130, 246, 0.75))",
        iconColor: "rgba(224, 242, 254, 0.95)"
    },
    {
        id: 4,
        title: "Kubernetes en AWS",
        description: "CI/CD, despliegue con contenedores y uso de múltiples lenguajes y tecnologías",
        fullDescription: "Aplicación distribuida en clúster de Kubernetes gestionado con múltiples APIs backend en contenedores, base de datos MongoDB y servicios de AWS.",
        technologies: ["Angular", "Docker", "Amazon ECR", "MongoDB", "Amazon SES", "Minikube"],
        iconClass: "fa-solid fa-diagram-project",
        iconBackground: "linear-gradient(135deg, rgba(5, 150, 105, 0.82), rgba(34, 197, 94, 0.65))",
        iconColor: "rgba(236, 253, 245, 0.95)"
    }
];

// Exportar para uso en script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects };
}
