# Project BlackList Team 1 💻

<a href="https://project-blacklist.vercel.app/" target="_blank">
<img width="400" src="frontend/src/assets/logo_uno.png" />
<a/>

¡Olvídate de los correos temporales!
Mantén limpio y seguro tu base de datos con nuestra plataforma.
TempBlock detecta esos correos con dominio insano mediante una Black List.

## Conoce nuestros planes!

|     | Plan    | Peticiones | Soporte |
| --- | ------- | ---------: |  :-----: |
| <img width="20" src="frontend/src/assets/gratis.png" />  | Gratis  |         20 |   <img width="17" src="https://static.vecteezy.com/system/resources/previews/022/377/715/non_2x/cross-check-mark-icon-button-and-no-or-wrong-symbol-on-reject-cancel-sign-button-rendering-3d-free-png.png"/>   |
|  <img width="20" src="frontend/src/assets/premium.png" /> | Premium |       1.000 |    <img width="20" src="https://static.vecteezy.com/system/resources/thumbnails/018/888/319/small_2x/check-mark-icon-png.png"/>   |
| <img width="20" src="frontend/src/assets/top.png" />  | Top     |     10.000 |    <img width="20" src="https://static.vecteezy.com/system/resources/thumbnails/018/888/319/small_2x/check-mark-icon-png.png"/>    |

## Instalación y uso de manera local 🛠️

### Clona este repositorio [GitHub]

```bash
git clone https://github.com/danisan15/project_blacklist.git
```

### Cree un entorno virtual en el backend

Este script creara un entorno virtual en el backend.

En Windows:

```shell
cd backend
python -m venv myenv
myenv\Scripts\activate
```

En Linux
```bash
cd backend
python3 -m venv myenv
source myenv/bin/activate
```

### Instale los modulos del backend

Este script instalara los modulos del backend.

En Windows o Linux:

```cmd
pip install -r requirements.txt
```

### Instale las dependencias del frontend

Estos script instalaran las dependencias del frontend.

En Windows o Linux:

```cmd
cd frontend
npm install
```


## Ejecucion local ⚙️

Ejecutar frontend.

En Windows o Linux:

```cmd
cd frontend
npm run dev #
```

Ejecutar backend.

En Windows o Linux:

```cmd
cd backend
flask run #
```

## Tecnologías utilizadas 📲


- [Python] <a href="https://www.python.org/" target="_blank"><img width="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" /><a/> : es un lenguaje de alto nivel de programación interpretado cuya filosofía hace hincapié en la legibilidad de su código,
- [Supabase] <a href="https://supabase.com/" target="_blank"><img width="30" src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png" /><a/> : es una alternativa de Firebase de código abierto que ofrece backend como servicio para una variedad de aplicaciones.
- [Paypal] <a href="https://www.paypal.com/ve/home" target="_blank"><img width="35" src="https://brandlogos.net/wp-content/uploads/2021/11/paypal-logo.png"/><a/> : un servicio que te permite pagar, enviar dinero y aceptar pagos sin tener que introducir tus datos financieros continuamente.
- [Coinbase] <a href="https://www.coinbase.com/es" target="_blank"><img width="50" src="https://seeklogo.com/images/C/coinbase-new-2021-logo-FA5145228F-seeklogo.com.png"/><a/> : es una plataforma online segura para comprar, vender, transferir y almacenar criptomonedas.
- [Sheet.best] <a href="https://sheet.best/" target="_blank"><img width="60" src="https://sheet.best/images/logo.svg" /><a/> : es una plataforma que convierte las hojas de cálculo en API REST.
- [Node.js] <a href="https://nodejs.org/es" target="_blank"><img width="45" src="https://nodejs.dev/static/images/brand/logos-js-bottom/light.svg" /><a/> : es un entorno en tiempo de ejecución multiplataforma, de código abierto, basado en el lenguaje de programación JavaScript y basado en el motor V8 de Google.
  - [Vite] <a href="https://vitejs.dev/" target="_blank"><img width="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png" /><a/> : es un entorno de desarrollo web extremadamente rápido y ligero para la creación de aplicaciones web modernas en JavaScript y TypeScript.
  - [React] <a href="https://es.react.dev/" target="_blank"><img width="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" /><a/> : es una librería Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.


## Estructura del proyecto 🏛️

```

- 📃Readme.md          # Documentanción del Proyecto

- 💻frontend            # Frontend creado con Vite
----- 📁public          # Directorio para favicon.ico      
----- 📁src             # Componentes de React
----- index.html         # html inicial de React

- ⚙️backend              # Backend contruido con flask
----- 📁__pycache__      # 
----- 📁env              # 
----- app.py              # Script inicial del backend
----- requirements.txt    # Módulos requeridos


```

## Variables de entorno 

Backend:

```
EMAIL_PASSWORD = 
PAYPAL_CLIENT_ID_2 = 
PAYPAL_SECRET_KEY_2 =
SUPABASE_KEY = 
SUPABASE_URL = 
ORIGIN_URL =
COINBASE_API_KEY = 
CRYPTO_REDIRECT_URL =
```

Frontend:

```
VITE_SUPABASE_URL = 
VITE_SUPABASE_KEY = 
VITE_UPDATE_PASSWORD_URL = 
VITE_VERIFY_EMAIL_URL = 
VITE_SUPPORT_EMAIL_URL = 
VITE_CREATE_USER = 
VITE_CREATE_ORDER = 
VITE_ORIGIN_URL = 
VITE_SIGN_UP = 
VITE_COMPLETE_ORDER =
VITE_CREATE_ORDER_CRYPTO =
```

## Derechos de autor 📝

Proyecto realizado por: 

- Daniel Santaella   @danisan15
- César Bruzual      @Cesar00z
- Christian Salazar  @CsChristian20

Team 1 - Projecto 2

### 🏅Social Oplesk @SocialOplesk 
