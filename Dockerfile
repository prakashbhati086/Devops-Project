# Use an official nginx image as a base image
FROM nginx:alpine

# Copy website files to the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 5555

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
