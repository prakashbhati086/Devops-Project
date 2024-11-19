FROM nginx:alpine

# Remove default nginx index file
RUN rm /usr/share/nginx/html/index.html

# Copy all project files to nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Default command to run nginx
CMD ["nginx", "-g", "daemon off;"]