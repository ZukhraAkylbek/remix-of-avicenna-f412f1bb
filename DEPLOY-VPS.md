# Перенос сайта на свой сервер (VPS)

Сайт — это серверное приложение (SSR): ему нужен Node.js-процесс, а не просто папка со статичными файлами. Ниже два способа — рекомендуется Docker.

База данных, авторизация и хранилище остаются в Lovable Cloud — их переносить не нужно, сайт на вашем сервере будет работать с той же базой.

Публикация в Lovable (облачный вариант) при этом продолжает работать как раньше: сборка по умолчанию не менялась, серверный режим включается только для VPS-команд (`build:vps` и Docker). Можно пользоваться и тем и другим одновременно.

---

## Способ 1. Docker (рекомендуется)

Требуется Docker и Docker Compose на сервере (Ubuntu: `curl -fsSL https://get.docker.com | sh`).

### 1. Получите код на сервере

Подключите проект к GitHub в Lovable (меню **+ → GitHub → Connect project**), затем на сервере:

```bash
git clone <адрес-вашего-репозитория> avicenna
cd avicenna
```

### 2. Создайте файл `.env`

```bash
cp .env.example .env
nano .env
```

Заполните значениями из Lovable (Cloud → настройки; ключи вида `VITE_*` — публичные, `SUPABASE_SERVICE_ROLE_KEY` и `LOVABLE_API_KEY` — секретные).

### 3. Соберите и запустите

```bash
docker compose up -d --build
```

Сайт будет работать на `http://127.0.0.1:3000` внутри сервера.

### 4. Настройте Nginx и HTTPS

```nginx
server {
    listen 80;
    server_name ваш-домен.kg;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Затем выпустите бесплатный сертификат:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ваш-домен.kg
```

DNS-запись **A** домена должна указывать на IP вашего сервера.

---

## Способ 2. Без Docker (Node.js 22)

```bash
# 1. Код и зависимости
git clone <адрес-вашего-репозитория> avicenna && cd avicenna
bun install          # или npm install

# 2. Переменные окружения (до сборки!)
cp .env.example .env && nano .env

# 3. Сборка — VITE_* подтянутся из .env автоматически
bun run build:vps     # или: npm run build:vps

# 4. Запуск (порт 3000 по умолчанию; меняется через PORT)
node .output/server/index.mjs
```

Чтобы процесс переживал перезагрузку сервера, запустите его через systemd или `pm2`:

```ini
# /etc/systemd/system/avicenna.service
[Unit]
Description=Avicenna website
After=network.target

[Service]
WorkingDirectory=/путь/к/avicenna
EnvironmentFile=/путь/к/avicenna/.env
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now avicenna
```

Nginx настраивается так же, как в способе 1.

---

## Обновление сайта

```bash
git pull
docker compose up -d --build        # Docker (режим сервера задан в Dockerfile)
# или: bun install && bun run build:vps && sudo systemctl restart avicenna
```

## Важно

- **Не используйте** старую конфигурацию «статичного сайта» (`try_files ... /index.html`) — маршрутизацией управляет сам сервер приложения.
- `SUPABASE_SERVICE_ROLE_KEY` и `LOVABLE_API_KEY` — секреты: не коммитьте `.env` в git и не публикуйте их.
- Резервная копия базы: Lovable → Cloud → Advanced settings → Export data.
