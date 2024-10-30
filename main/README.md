### 1. WebGL
WebGL (Web Graphics Library) est une API JavaScript permettant de dessiner des graphiques 3D et 2D dans un navigateur web sans utiliser de plugins. Elle fonctionne en interagissant directement avec le GPU (processeur graphique) de l'ordinateur pour exécuter des calculs de rendu graphiques complexes.

---

### 2. **Canvas**
La balise `<canvas>` en HTML crée une surface de dessin que WebGL utilise pour afficher des graphismes. C'est une sorte de "toile" numérique où tout dessin (qu’il soit en 2D ou en 3D) se produit.

---

### 3. **Vertex Shader**
Un *vertex shader* (ou "shader de sommet") est un programme court exécuté pour chaque sommet d’un objet en 3D. Son rôle principal est de calculer la position finale de chaque sommet à afficher sur l'écran. 

---

### 4. **Fragment Shader**
Le *fragment shader* (ou "shader de fragment") s’exécute pour chaque pixel de la surface de dessin et calcule la couleur de chaque pixel. En WebGL, le fragment shader détermine donc la couleur visible des pixels de l’objet dessiné.

---

### 5. **GLSL (OpenGL Shading Language)**
GLSL est le langage utilisé pour écrire des shaders en WebGL. C'est un langage de programmation qui ressemble au C et qui permet d'exécuter des calculs parallèles sur le GPU. 

---

### 6. **Attribute**
Un *attribute* (attribut) en WebGL est une variable d’entrée du vertex shader, qui permet d'envoyer des informations comme les positions des sommets, les couleurs ou les coordonnées de texture depuis le JavaScript vers le shader.

Dans ce code :
```glsl
attribute vec4 a_position;
```
**`a_position`** est un attribut qui contient la position de chaque sommet du triangle.

---

### 7. **gl_Position**
En WebGL, `gl_Position` est une variable spéciale dans le vertex shader qui définit la position finale d'un sommet. C’est la variable que chaque vertex shader doit calculer pour indiquer où le sommet doit être placé dans l'espace de dessin.

---

### 8. **Buffer**
Un *buffer* est une zone mémoire qui stocke des données envoyées à la carte graphique. En WebGL, un buffer est souvent utilisé pour stocker des positions de sommets, des couleurs, ou d'autres informations nécessaires pour le rendu graphique.

Dans ce code, `positionBuffer` contient les positions de chaque sommet du triangle.

---

### 9. **Array Buffer**
`ARRAY_BUFFER` est un type de buffer dans WebGL qui contient les coordonnées de sommets. Il est associé aux attributs du vertex shader pour indiquer comment les données doivent être utilisées pour dessiner des formes.

---

### 10. **Program**
Un *programme* en WebGL est une combinaison d’un vertex shader et d’un fragment shader. Les shaders sont liés ensemble dans un programme pour que WebGL puisse les exécuter ensemble et ainsi dessiner un objet sur le `canvas`.

---

### 11. **Viewport**
La *viewport* est la zone de dessin définie dans le `canvas` où WebGL dessine l'image. Elle est définie avec des coordonnées (x, y, largeur, hauteur) et est souvent réglée pour correspondre aux dimensions du `canvas`.

---

### 12. **clearColor**
La fonction `gl.clearColor` définit la couleur de fond du `canvas` en spécifiant les valeurs de rouge, vert, bleu et alpha (transparence). Cette couleur de fond sera utilisée chaque fois que `gl.clear` est appelé pour nettoyer le `canvas`.

---

### 13. **drawArrays**
`gl.drawArrays` est la commande qui dit à WebGL de dessiner des formes à partir des sommets stockés dans le buffer. Elle prend en paramètres le type de forme (ici `gl.TRIANGLES` pour un triangle) et le nombre de sommets à utiliser.

---

### 14. **gl.**
Dans WebGL, `gl` représente le contexte graphique. Toutes les fonctions et commandes pour dessiner, gérer les buffers, configurer les shaders, etc., sont appelées en utilisant ce contexte (`gl`).