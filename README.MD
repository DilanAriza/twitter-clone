# Twitter Clone 

_Desarrollado por Dilan Ariza_

# Instalación
_Todo fue desarrollado en entorno "NodeJS"_

#

## NodeJS and NPM

Actualizamos 

```
sudo apt update
```

Instalamos node

```
    sudo apt install nodejs
```

Para comprobar que tenemos instalado nodejs y npm ejecutamos

_Verificamos si tenemos instalado NPM_

```
    node -v
    -- 12.x.x
    npm -v
    -- 6.x.x
```

Si obtenemos un mensaje de error, lo intentamos de nuevo e instalamos independiente de node

```
    sudo apt install npm 
```

#

## Instalación del repositorio

_Para poder instalar el repositorio necesitamos tener instalado GIT_


- Instalación con SSH

```
    git clone git@github.com:DilanAriza/twitter-clone.git
```

- Instalación con HTTP

```
    git clone https://github.com/DilanAriza/twitter-clone.git
```

#

## Instalación de dependencias

_Para instalar correctamente las dependencias utilizamos npm_

entramos al directorio de nuestro proyecto y ejecutamos

```
    npm install
```

Ahora tendremos una nueva carpeta creada en nuestro directorio llamada `node_modules`

Luego de esto, ya tendremos instalado todo lo necesario para poder continuar con nuestro proyecto.

#

## Ejecución del proyecto

_Para poder ejecutar el proyeco, necesitamos tener instalado todo previamente y tener el puerto 3000 disponible_

Ejecutamos 

```
    npm run dev
```

## Y listo!

Ahora iremos al [http://localhost:3000](http://localhost:3000)