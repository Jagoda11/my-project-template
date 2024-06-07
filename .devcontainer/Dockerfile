# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Add metadata to the image to describe that the container is used for Github Codespaces
LABEL name="GitHub Codespaces with Datadog" \
      vendor="GitHub" \
      version="1.0" \
      release="1" \
      summary="GitHub Codespaces with Datadog" \
      description="This is a custom container used for GitHub Codespaces."

# Set environment variables
ENV DD_API_KEY=${DD_API_KEY}

# Install any needed packages specified in package.json
COPY package*.json ./
RUN npm install

# Install Datadog agent
RUN DD_SITE=datadoghq.eu DD_HOSTNAME=github-codespace DD_API_KEY=${DD_API_KEY} bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

# Bundle app source
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "server.js" ]