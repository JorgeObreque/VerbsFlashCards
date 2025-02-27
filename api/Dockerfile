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

# Expone el puerto 5000
EXPOSE 5000

# Comando para ejecutar la API
CMD ["node", "server.js"]