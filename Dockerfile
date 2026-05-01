# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy custom nginx config if we had one, but default works for SPAs generally
# If you need SPA routing support in Docker, uncomment the line below and create nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
