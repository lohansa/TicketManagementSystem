# Stage 1: Build the Angular app
FROM node:18 as build

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the Angular app
COPY . .
RUN npm run build -- --output-path=/app/dist

# Stage 2: Serve the Angular app with nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy Angular build output from `dist/browser` to nginx HTML folder
COPY --from=build /app/dist/browser /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
