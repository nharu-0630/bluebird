# bluebird

Cache enabled Twitter client via an intermediate server.  
中間サーバを経由することでキャッシュを有効化したTwitterクライアント.  

## Usage

Docker Compose and Supabase are required.  
Docker Compose と Supabase が必要です.  

### 1. Set up Supabase

Installing and running Supabase.  
Supabase のインストールと実行.  

```bash
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env
docker compose pull
docker compose up -d
```

### 2. Set up bluebird

Cloning and running bluebird.  
bluebird のクローンと実行.  

```bash
git clone --depth 1 https://github.com/nharu-0630/bluebird
cd bluebird
cp .env.example .env
docker compose pull
docker compose -f docker-compose.prod.yml up --build -d
```

### 3. Access to bluebird

Access to `http://localhost/twitter/[YOUR_TWITTER_ID]` in your browser.  
ブラウザで `http://localhost/twitter/[YOUR_TWITTER_ID]` にアクセス.  