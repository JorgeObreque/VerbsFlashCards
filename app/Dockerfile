# Usa una imagen oficial de Node.js
FROM node:18

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "run", "preview"]