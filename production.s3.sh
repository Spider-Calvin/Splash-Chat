cp .env.prod .env
npx vite build 
aws s3 cp dist/ s3://wacom-client --recursive;
aws cloudfront create-invalidation --distribution-id EOWMD5XN8PCX5 --paths "/*"