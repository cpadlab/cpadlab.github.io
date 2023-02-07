# ¿Cómo Crwar una Librería?

## Vídeo

<>

## Estructura

```
├── mi_libreria
│   ├── funcionalidades
│   │   └── ejemplo.py
│   └── __init__.py
├── README.md
└── setup.py

2 directories, 4 files
```

## __init__

En el archivo __init__ es el archivo encargado de 

Este fichero lo podemos dejar en blanco. Si lo dejamos en blanco, a la hora de utilizar nuestra función en Python deberemos invocarla así:

```
from mi_libreria.funcionalidades import ejemplo
```

Para una buena importación, en el init haremos li siguiente:

```
from mi_libreria.funcionalidades import ejemplo
```

O en mi caso, que lo que quiero es que la gente use una clase:

```
from mi_libreria.funcionalidades.scytale import Scytale
```

Ahora sí que cualquiera que utilice nuestra librería podrá invocar a la función de la siguiente manera:

```
from mi_libreria import Scytale
```

Y su manera de uso sera ña siguiente

```
Scytale.encrypt("hola", "clave")
```

## Archivo Setup

```
from setuptools import setup, find_packages

with open('README.md') as fh:
    long_description = fh.read()

setup(
    name='<nombre-libreria>',
    version='<version-libreria>',
    packages=find_packages(),
    url='<URL(PyPi)-libreria>>',
    license='<licencia-libreria>',
    author='<autor-libreria>',
    author_email='<mail-de-contacto>',
    description='<decripción-libreria>',
    long_description=long_description,
    long_description_content_type="text/markdown",
    install_requires=[],
    project_urls={
        "Source Code": "<URL>",https://github.com/14wual/pycryptools/
https://github.com/14wual/pycryptools/issues
https://pycryptools.readthedocs.io/
        "Bug Tracker": "<URL>",
        "Documentation": "<URL>",
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
    ],
    keywords='encrypt decrypt',    
)
```
