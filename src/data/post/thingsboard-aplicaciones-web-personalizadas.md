---
publishDate: 2025-05-16T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/thingsboard-aplicaciones-web-personalizadas
title: "Cómo desarrollar aplicaciones web personalizadas sobre ThingsBoard"
excerpt: "Extiende ThingsBoard con aplicaciones, widgets y APIs a medida para cumplir requisitos únicos de automatización industrial."
image: '~/assets/images/thingsboard.jpg'
category: IIoT
tags:
  - thingsboard
  - desarrollo web
metadata:
  canonical: https://eduardovieira.dev/es/thingsboard-aplicaciones-web-personalizadas
---

# Cómo desarrollar aplicaciones web personalizadas sobre ThingsBoard

ThingsBoard ofrece una interfaz robusta desde el primer día, pero muchos proyectos necesitan funcionalidades a medida. Así extiendo ThingsBoard de forma segura sin comprometer la mantenibilidad.

## 1. Decide cuándo extender

- **Flujos personalizados:** por ejemplo, aprobaciones de mantenimiento en varios pasos.
- **Visualizaciones especializadas:** mapas de calor, modelos 3D o overlays de realidad aumentada.
- **Puentes de integración:** incrustar funcionalidades MES/ERP directamente en dashboards de ThingsBoard.

Si el requisito cabe en los widgets existentes, configura en lugar de personalizar. Construye solo cuando el ROI sea claro.

## 2. Flujo de trabajo para desarrollar widgets

1. Genera el scaffolding con el SDK de widgets de ThingsBoard.
2. Desarrolla en un entorno local Angular/TypeScript con recarga en caliente.
3. Usa las APIs REST para probar fuentes de datos.
4. Empaqueta los widgets y despliega vía la UI de ThingsBoard o su API REST.

## 3. Fragmento de widget de ejemplo

```typescript
self.onInit = () => {
  self.ctx.defaultSubscription.subscribe(data => {
    self.level = data.data[0].value;
  });
};

self.getLevelColor = () => {
  if (self.level > 80) { return '#ff5f56'; }
  if (self.level > 50) { return '#ffbd2e'; }
  return '#27c93f';
};
```

## 4. Autenticación y APIs

- Usa la API REST de ThingsBoard para operaciones CRUD sobre activos, telemetría y alarmas.
- Autentica mediante tokens JWT; renueva los tokens de manera segura en las apps cliente.
- Respeta los límites de inquilino y las cuotas para no interrumpir a los usuarios de producción.

## 5. Despliegue y CI/CD

- Guarda los bundles de widgets y el código personalizado en Git.
- Automatiza el despliegue con pipelines CI que llamen a las APIs de ThingsBoard.
- Versiona los widgets; mantén notas de compatibilidad para dashboards que usen versiones anteriores.

## 6. Seguridad y gobernanza

- Valida la entrada del usuario para prevenir ataques de inyección.
- Restringe los widgets personalizados a desarrolladores de confianza y revisa el código con frecuencia.
- Monitorea los registros de auditoría para altas, cambios y eliminaciones de widgets.

## 7. Consideraciones de desempeño

- Optimiza las suscripciones de datos; cancélalas cuando los widgets se destruyan.
- Cachea cálculos pesados y reutiliza datasets entre widgets cuando sea posible.
- Prueba el desempeño con volúmenes de datos similares a los de producción.

Extender ThingsBoard con criterio te permite entregar experiencias a medida para los operadores sin dejar de mantener la plataforma soportable. Trata el código personalizado con el mismo rigor que cualquier aplicación en producción.
