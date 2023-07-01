FROM node:16-alpine3.11
# Copy all files to the container (including 'server.js' in the root directory)
COPY . .
# Install dependencies
RUN yarn install
# Expose the port the app runs in
EXPOSE 3052
# Start the server
CMD ["node", "server.js"]