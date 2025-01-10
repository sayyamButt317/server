# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all necessary files (excluding those in .dockerignore)
COPY . .


# Set the default command
CMD ["npm", "start"]






# FROM node:18 as builder

# WORKDIR /build

# COPY package*.json .

# RUN npm install

# COPY src/ src/

# RUN npm run build


# # Stage 2

# FROM node:18 as runner

# WORKDIR /app

# COPY --from=builder app/package*.json .
# COPY --from=builder app/node_modules node_modules/
# COPY --from=builder app/dist dist/

# CMD ["npm","start"]
