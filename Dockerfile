

# --- Étape 1 : build ---
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# --- Étape 2 : serve to nginx au navigateur ---
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Objectif de l’exercice :
    # Ce qu’il faut retenir
    # React en dev = outil de développement (vite + node)
    # React en prod = fichiers statiques (dist/) js car le navigateur ne comprend que le js, html et css
    # Docker = permet d’emballer tout ça proprement
    # Nginx = sert ton site au navigateur
