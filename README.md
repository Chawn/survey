Laravel, Mamp, vite, vue

Install Laravel via Composer
```
  composer create-project laravel/laravel example-app
  cd example-app
  php artisan serve
```

# Edit .env
```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=survey
  DB_USERNAME=root
  DB_PASSWORD=root
```

php artisan migrate


# install vite vue
  ```
  npm init vite vue
  cd vue
  npm install
  npm run dev
  npm install -S vuex@next
  ```

  Create folder "vue/src/store"
  Create file "index.js" in store folder

 

# install tailwind
  https://tailwindcss.com/docs/guides/vite


  ```
  npm install @headlessui/vue @heroicons/vue @tailwindcss/forms -S
  ```

# router

run `npm i -S vue-router@next`

create folder "vue/src/routes"
create file "index.js" in routes folder

