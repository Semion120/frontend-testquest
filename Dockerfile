# Первый этап: сборка приложения
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Установка зависимостей
COPY package*.json yarn.lock* ./
RUN npm ci

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Второй этап: запуск статического фронтенда
FROM nginx:alpine

# Копируем собранные файлы в рабочую директорию NGINX
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Запускаем NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]