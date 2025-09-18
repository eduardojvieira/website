---
title: "Modernizar el desarrollo PLC: convertir texto estructurado a texto plano para control de versiones y programación con IA"
excerpt: "Cómo cerrar la brecha entre la programación de automatización industrial y las prácticas modernas de software con una herramienta que convierte código PLC a archivos de texto plano para Git y asistentes de IA."
image: ~/assets/images/ai_programming.png
category: Automatización Industrial
tags:
  - programación plc
  - codesys
  - control de versiones
  - git
  - texto estructurado
  - automatización industrial
  - programación ia
metadata:
  canonical: https://eduardovieira.dev/es/convertidor-texto-estructurado-plano-plc
author: Eduardo Vieira
publishDate: 2025-04-08T00:00:00Z
lang: es
slug: es/convertidor-texto-estructurado-plano-plc
---

## El eslabón perdido en el desarrollo PLC

Los programadores de automatización industrial han enfrentado un reto constante: mientras el resto del mundo de software disfruta de control de versiones robusto, herramientas colaborativas y programación asistida por IA, el desarrollo PLC sigue aislado en entornos propietarios. Esta brecha genera varios problemas:

1. **Control de versiones limitado:** Los PLC guardan código en archivos binarios que Git u otros VCS no pueden rastrear de forma útil.
2. **Sin visualización de diffs:** Identificar cambios entre versiones es innecesariamente complicado.
3. **Barreras de colaboración:** Varios ingenieros no pueden trabajar fácilmente en distintas partes del proyecto.
4. **Brecha con la IA:** Los asistentes de código modernos no leen ni modifican archivos binarios de proyectos PLC.

Para cerrar esta brecha desarrollé el **Convertidor de Texto Estructurado PLC a Texto Plano**, una herramienta open source que transforma proyectos CODESYS y ABB Automation Builder en archivos de texto controlables por versiones y aptos para programación asistida por IA.

## Desbloquear flujos modernos para automatización

La herramienta crea un flujo bidireccional entre el entorno PLC y archivos de texto plano:

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/10.%20ai.png" alt="Integración con IDE" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

El convertidor permite exportar e importar:

- Program Organization Units (POU)
- Data Unit Types (DUT)
- Métodos, funciones y bloques de función
- Configuraciones de tareas
- Propiedades, acciones y transiciones

Al extraer el código fuente a texto plano habilitas varias capacidades clave:

### 1. Control de versiones real con Git

Con el código PLC en formato de texto aprovechas todo el potencial de Git:

- Rastrear cambios significativos en lugar de diferencias binarias
- Crear ramas de funcionalidades para desarrollo en paralelo
- Revisar cambios con diffs claros antes de fusionar
- Mantener un historial completo del código

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/12.%20git.png" alt="Integración con Git" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

### 2. Programación PLC asistida por IA

Lo más atractivo es usar asistentes de código modernos con tu base PLC:

- Obtener sugerencias inteligentes de autocompletado
- Refactorizar lógica compleja con ayuda de IA
- Generar documentación automáticamente
- Identificar bugs y oportunidades de optimización

### 3. Plantillas de proyecto más simples

La herramienta añade funciones para gestionar plantillas:

- Generar plantillas reutilizables
- Actualizar proyectos desde plantillas
- Estandarizar la estructura de código entre máquinas

## Configuración del convertidor PLC-texto

Poner en marcha el convertidor es sencillo.

### Instalación

1. Copia la carpeta Script Commands en tu instalación CODESYS o Automation Builder:
   - CODESYS: `C:\Program Files\CODESYS 3.5.20.50\CODESYS\Script Commands`
   - Automation Builder: `C:\Program Files\ABB\AB2.8\AutomationBuilder\Script Commands`
2. Abre el entorno PLC sin cargar un proyecto.
3. Selecciona **Tools → Customize** en el menú:
   <p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/1.%20codesys.png" alt="Menú Customize" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>
4. Selecciona o crea una toolbar y pulsa **Add Command...**:
   <p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/2.%20toolbar.png" alt="Configuración de toolbar" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>
5. En la categoría **ScriptEngine Commands** agrega los comandos **Export to Files** e **Import From Files**:
   <p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/3.%20commands.png" alt="Añadir comandos" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>
6. Verás los botones de exportación e importación en tu barra de herramientas:
   <p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/4.%20buttons.png" alt="Botones Export/Import" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

## Uso del convertidor: flujo práctico

Así integro la herramienta en mi flujo diario:

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/5.%20project.png" alt="Nuevo proyecto" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

### Paso 1: organiza la estructura del proyecto

Crea una carpeta `src` dentro de tu Application para contener todo lo que sincronizarás:

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/6.%20src.png" alt="Organización" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

**Importante:** Solo se exporta/importa lo que está dentro de esa carpeta. Deja configuraciones de comunicación y componentes de sistema fuera porque el convertidor no los soporta.

### Paso 2: exporta a texto plano

Con el proyecto organizado, haz clic en **Export to Files** para extraer todo al sistema de archivos:

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/7.%20export.png" alt="Proceso de exportación" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

Los archivos se generan siguiendo la estructura del proyecto:
`<Project Name>/<Device Name>/<Application Name>/src/`

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/8.%20files.png" alt="Archivos generados" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

### Paso 3: edita con herramientas modernas

Abre y edita los archivos con tu editor o IDE favorito:

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/9.%20ide.png" alt="Edición en IDE" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

**Importante:** No elimines la línea `// --- BEGIN IMPLEMENTATION ---`; ayuda al script a distinguir entre declaraciones de variables y código.

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/10.%20ai.png" alt="Asistente IA" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

### Paso 4: importa de vuelta al entorno PLC

Cuando estés listo, usa **Import From Files** para traer el código actualizado al proyecto:

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/11.%20imported.png" alt="Código importado" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

### Paso 5: aprovecha el control de versiones

Con el código en texto, realiza commits y sigue la evolución de tu lógica de control:

<p><img src="https://raw.githubusercontent.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI/refs/heads/main/img/12.%20git.png" alt="Commits en Git" class="w-full rounded-md bg-gray-400 dark:bg-gray-700"></p>

Conserva también el archivo binario del proyecto en el repositorio para referencia.

## Buenas prácticas y limitaciones

La herramienta mejora notablemente el flujo PLC, pero considera lo siguiente:

### Buenas prácticas

- Define una estructura de carpetas consistente entre proyectos.
- Haz commit tanto de archivos de texto como del binario del proyecto.
- Escribe mensajes de commit descriptivos sobre los cambios en la lógica.
- Usa ramas para nuevas funciones y pruebas.

### Limitaciones actuales

- No soporta exportar/importar elementos de visualización.
- Dispositivos de comunicación tienen soporte limitado.
- La gestión de recetas debe permanecer fuera de la carpeta exportada.
- Probado extensivamente en CODESYS V3.5 SP20.

## Conclusión: llevar la programación PLC a la era moderna

El Convertidor de Texto Estructurado a Texto Plano representa un puente entre la programación industrial tradicional y las prácticas modernas de software. Al habilitar control de versiones, colaboración y programación asistida por IA, aceleramos el desarrollo, mejoramos la calidad de código y reducimos la brecha de habilidades en automatización.

La herramienta está disponible en [GitHub](https://github.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI) y recibe contribuciones de la comunidad.

Para más detalles técnicos consulta la [documentación de scripting de CODESYS](https://help.codesys.com/webapp/idx-scriptingengine) o la ayuda local en `C:\<CODESYS INSTALL LOCATION>\CODESYS\Online Help\en\ScriptEngine.chm`.
