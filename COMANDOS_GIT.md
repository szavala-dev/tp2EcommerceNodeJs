# Comandos para Subir el Proyecto a GitHub

## Repositorio Remoto
**URL**: `https://github.com/szavala-dev/tp2EcommerceNodeJs.git`

---

## Opción 1: Cambiar el remoto origin (Recomendado)

Si quieres reemplazar el remoto actual con tu nuevo repositorio:

```bash
# 1. Eliminar el remoto origin actual
git remote remove origin

# 2. Agregar tu nuevo repositorio como origin
git remote add origin https://github.com/szavala-dev/tp2EcommerceNodeJs.git

# 3. Verificar que se agregó correctamente
git remote -v

# 4. Agregar todos los archivos modificados y nuevos
git add .

# 5. Hacer commit de los cambios
git commit -m "Correcciones: configuración de package.json, dotenv, conexión DB y logger"

# 6. Subir al repositorio remoto (primera vez)
git push -u origin Master
```

**Nota**: Si el repositorio remoto está vacío, puedes usar `-u` para establecer el tracking.

---

## Opción 2: Agregar como remoto adicional

Si quieres mantener el remoto original y agregar uno nuevo:

```bash
# 1. Agregar el nuevo repositorio con un nombre diferente (ej: "szavala")
git remote add szavala https://github.com/szavala-dev/tp2EcommerceNodeJs.git

# 2. Verificar que se agregó correctamente
git remote -v

# 3. Agregar todos los archivos modificados y nuevos
git add .

# 4. Hacer commit de los cambios
git commit -m "Correcciones: configuración de package.json, dotenv, conexión DB y logger"

# 5. Subir al nuevo repositorio
git push -u szavala Master
```

---

## Opción 3: Forzar push (Solo si el repositorio remoto ya tiene contenido)

Si el repositorio remoto ya tiene commits y quieres sobrescribirlos (¡CUIDADO!):

```bash
# Cambiar el remoto
git remote set-url origin https://github.com/szavala-dev/tp2EcommerceNodeJs.git

# Agregar cambios
git add .

# Commit
git commit -m "Correcciones: configuración de package.json, dotenv, conexión DB y logger"

# Forzar push (SOLO si es necesario y estás seguro)
git push -u origin Master --force
```

⚠️ **ADVERTENCIA**: `--force` sobrescribe el historial remoto. Úsalo solo si estás seguro.

---

## Comandos Paso a Paso (Recomendado - Opción 1)

```bash
# Paso 1: Cambiar al directorio del proyecto (si no estás ahí)
cd "C:\Users\feder\tp2EcommerceNodeJs\TP2_Final_E_Commerce"

# Paso 2: Ver estado actual
git status

# Paso 3: Eliminar remoto origin actual
git remote remove origin

# Paso 4: Agregar tu nuevo repositorio
git remote add origin https://github.com/szavala-dev/tp2EcommerceNodeJs.git

# Paso 5: Verificar remotos
git remote -v

# Paso 6: Agregar todos los cambios
git add .

# Paso 7: Hacer commit
git commit -m "Correcciones: configuración de package.json, dotenv, conexión DB y logger"

# Paso 8: Subir al repositorio
git push -u origin Master
```

---

## Archivos que se Subirán

Los siguientes archivos serán incluidos en el commit:

### Archivos Modificados:
- `api.js` - Agregado dotenv y validación de puerto
- `connection/connection.js` - Conversión de puerto a número
- `middlewares/logger.js` - Corregida lógica de producción
- `package.json` - Corregidos main y script start

### Archivos Nuevos:
- `ANALISIS_Y_CORRECCIONES.md` - Documentación del análisis
- `PASOS_PARA_EJECUTAR.md` - Guía de ejecución
- `env.example` - Plantilla de variables de entorno

### Archivos que NO se Subirán (ya en .gitignore):
- `node_modules/` - Dependencias
- `.env` - Variables de entorno (sensibles)
- `*.log` - Archivos de log

---

## Solución de Problemas

### Error: "remote origin already exists"
Si ya existe un remoto origin y quieres cambiarlo:
```bash
git remote set-url origin https://github.com/szavala-dev/tp2EcommerceNodeJs.git
```

### Error: "repository not found" o "authentication failed"
- Verifica que tengas permisos de escritura en el repositorio
- Verifica que la URL sea correcta
- Puede que necesites autenticarte:
  ```bash
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu@email.com"
  ```

### Error: "fatal: refusing to merge unrelated histories"
Si el repositorio remoto tiene historial diferente:
```bash
git pull origin Master --allow-unrelated-histories
# Luego resuelve conflictos si los hay
git push -u origin Master
```

### Error: "failed to push some refs"
Si hay cambios en el remoto que no tienes localmente:
```bash
git pull origin Master
# Resuelve conflictos si los hay
git push -u origin Master
```

---

## Verificar que Todo se Subió Correctamente

Después del push, verifica en GitHub:
1. Ve a: https://github.com/szavala-dev/tp2EcommerceNodeJs
2. Verifica que todos los archivos estén presentes
3. Verifica que el commit aparezca en el historial

