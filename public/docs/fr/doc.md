
---
# Sommaire
- [Documentation](#documentation)
- [Syllogisme Guidé](#syllogisme-guidé)
  - [Description](#description)
  - Étapes d'utilisation
    - Étape 1 - Configurer chaque proposition
    - Étape 2 - Vérification
    - Barre utilitaire
- [Syllogisme Expert](#syllogisme-expert)
  - [Description](#description-1)
  - Étapes d'utilisation
    - Étape 1 - Entrez les termes
    - Étape 2 - Choisir la figure
    - Étape 3 - Remplir les propositions
    - Étape 4 - Vérification
    - Barre utilitaire
- [Polysyllogisme](#polysyllogisme)
  - [Description](#description-2)
  - Étapes d'utilisation
    - Étape 1 - Saisie des propositions
    - Étape 2 - Ajout de nouvelles propositions
    - Étape 3 - Suppression des propositions
    - Étape 4 - Réorganisation des propositions
    - Étape 5 - Validation
    - Barre utilitaire
    - Exemple de Polysyllogisme
    - Conseils d'utilisation
- [Page Quantificateur](#page-quantificateur)
  - [Description](#description-3)
  - [Fonctionnalités](#fonctionnalités)
- [Page Table des Syllogismes](#page-table-des-syllogismes)
  - [Description](#description-4)
- [Gestion de la langue](#gestion-de-la-langue)
  - [Description](#description-5)
- [Conclusion](#conclusion)



# Documentation
Cette application permet de créer des syllogismes grâce à deux modes (guidé, expert), ainsi que des polysyllogismes.

Il y a un total de cinq pages :
- Accueil
- Syllogisme
- Polysyllogisme
- Quantificateur
- Table des syllogismes

## Syllogisme Guidé
### Description
Le mode guidé offre plus de flexibilité en permettant à l'utilisateur de configurer les propositions "librement".

Cependant, quelques règles doivent être respectées :
- Les 4 termes des deux premières propositions doivent être non nuls
- Les quantificateurs de chaque proposition doivent être non nuls
- Les termes d'une même proposition doivent être différents
- Le moyen terme doit être unique

**Informations supplémentaires :**
La structure est la suivante (l'ordre des termes dans les deux premières propositions n'importe pas, seule la conclusion a un ordre prédéfini) :
- Première proposition : Prédicat et Moyen terme.
- Deuxième proposition : Sujet et Moyen terme.
- Conclusion : Sujet et Prédicat.

### Étapes d'utilisation :
#### Étape 1 - Configurer chaque proposition :
**`Quantificateurs`** : Choisissez parmi *All*, *Some*, *etc.*, pour définir le type de chaque proposition **(A, E, I, O)**.

**`Verbe`** : Entrez le verbe reliant les termes.

**`Termes`** : Entrez les termes directement dans les champs texte dédiés (l'ordre n'est pas imposé).

- Les termes de la première proposition sont choisis dans les champs texte

- Le premier terme de la deuxième proposition est choisi parmi les deux premiers termes (`prédicat ou moyen terme`) OU l'utilisateur peut choisir un nouveau terme (`Sujet`).

Une fois ce choix fait, l'utilisateur peut entrer le deuxième terme, qui sera l'inverse de ce qu'il a choisi pour le premier terme

#### Étape 2 - Vérification :
Vous pouvez cocher ou non l'option `Vérifier la Règle de l'hypothèse d'existence`.

Cliquez sur le `bouton Vérifier` pour valider le syllogisme et voir apparaître les différentes règles, avec leur validité ou non.

Si elles ne sont pas valides, une explication est fournie pour en indiquer la raison.

#### Barre utilitaire :
Cliquez sur le `bouton en forme de poubelle` pour effacer le syllogisme.

Cliquez sur le `bouton d'aide` pour afficher une aide liée à la page.

Cliquez sur le `bouton paramètres` pour accéder aux paramètres de quantificateur.

Cliquez sur le `bouton interrupteur (switch)` pour passer du mode expert au mode guidé, et vice-versa.

## Syllogisme Expert
### Description
Le mode expert assiste l'utilisateur dans la construction d'un syllogisme en demandant les termes nécessaires (`Sujet, Prédicat, Moyen terme`) et en organisant automatiquement les propositions selon la figure sélectionnée.

### Étapes d'utilisation :
#### Étape 1 - Entrez les termes :
`S (Terme Mineur)` : Le terme mineur ou sujet.

`P (Terme Majeur)` : Le terme majeur ou prédicat.

`M (Terme Moyen)` : Le terme moyen servant de lien.

    Exemple :
    Socrate pour S.
    Mortel pour P.
    Homme pour M.

#### Étape 2 - Choisir la figure :
Sélectionnez la structure du syllogisme parmi les `figures 1, 2, 3 ou 4`. Les figures définissent comment les termes S, P et M s'organisent dans les propositions.

#### Étape 3 - Remplir les propositions :
**`Quantificateurs`** : Choisissez parmi *All*, *Some*, *etc.*, pour définir le type de chaque proposition **(A, E, I, O)**.

**`Verbe`** : Entrez le verbe reliant les termes.

**`Termes`** : Les termes sont automatiquement organisés selon la figure choisie.

#### Étape 4 - Vérification :
Vous pouvez cocher ou non l'option `Vérifier la Règle de l'hypothèse d'existence`.

Cliquez sur le `bouton Vérifier` pour valider le syllogisme et voir apparaître les différentes règles, avec leur validité ou non.

Si elles ne sont pas valides, une explication est fournie pour en indiquer la raison.

#### Barre utilitaire :
Cliquez sur le `bouton en forme de poubelle` pour effacer le syllogisme.

Cliquez sur le `bouton d'aide` pour afficher une aide liée à la page.

Cliquez sur le `bouton paramètres` pour accéder aux paramètres de quantificateur.

Cliquez sur le `bouton interrupteur (switch)` pour passer du mode expert au mode guidé, et vice-versa.

## Polysyllogisme
### Description
La page polysyllogisme permet de construire des polysyllogismes, c'est-à-dire une série de propositions liées.

L'utilisateur peut :
- Ajouter ou supprimer des propositions.
- Réorganiser les propositions pour respecter un ordre logique valide.

### Étapes d'utilisation :
#### Étape 1 - Saisie des propositions :
Chaque proposition doit inclure :
- Un quantificateur (ex. : *All, Some, etc.*).
- Un verbe (ex. : *are*).
- Deux termes (ex. : *Homme et Mortel*).

#### Étape 2 - Ajout de nouvelles propositions :
Cliquez sur `Ajouter une Proposition` pour ajouter une nouvelle proposition.

Ces propositions ajoutées apparaîtront sous les propositions déjà existantes.

#### Étape 3 - Suppression des propositions :
Les propositions ajoutées peuvent être supprimées à l'aide du `bouton poubelle` situé à droite de chaque ligne.

Les trois propositions initiales (fournies par défaut) ne peuvent pas être supprimées.

#### Étape 4 - Réorganisation des propositions :
Cliquez sur le `bouton Réorganiser le Polysyllogisme` pour réarranger les propositions afin de respecter un ordre logique valide.

Un système de glisser-déposer (drag and drop) est disponible.

#### Étape 5 - Validation :
Vous pouvez cocher ou non l'option `Vérifier la Règle de l'hypothèse d'existence`.

Cliquez sur le `bouton Vérifier` pour valider l'ensemble du polysyllogisme et voir apparaître les différentes règles avec leur validité ou non. Si elles ne sont pas valides, une explication est fournie pour en indiquer la raison.

#### Barre utilitaire :
Cliquez sur le `bouton en forme de poubelle` pour effacer le polysyllogisme.

Cliquez sur le `bouton d'aide` pour afficher une aide liée à la page.

Cliquez sur le `bouton paramètres` pour accéder aux paramètres de quantificateur.

Cliquez sur le `bouton Ajouter une Proposition` pour ajouter une proposition.

Cliquez sur le `bouton Réorganiser le Polysyllogisme` pour réorganiser le polysyllogisme.

#### Exemple de Polysyllogisme :
    Proposition 1 : All Homme are Mortel
    Proposition 2 : All Socrate are Homme
    Proposition 3 : All Socrate are Mortel

#### Conseils d'utilisation :
Assurez-vous que les termes soient cohérents entre les propositions.

Utilisez la fonctionnalité glisser-déposer (drag and drop) pour tester différentes organisations si le polysyllogisme semble invalide.

Voici la version corrigée de votre texte :

## Page Quantificateur
### Description
Dans cette page, vous pouvez ajouter des quantificateurs personnalisés de type :
- A (Universelle affirmative)
- E (Universelle négative)
- I (Existentielle affirmative)
- O (Existentielle négative)

### Fonctionnalités
Vous pouvez supprimer certains quantificateurs que vous avez créés grâce au `bouton poubelle` ou réinitialiser les quantificateurs par défaut en cliquant sur le `bouton Rétablir les valeurs par défaut`.

Les quantificateurs créés seront disponibles dans les sélecteurs de quantificateurs des pages `Syllogisme` et `Polysyllogisme`.

---

## Page Table des Syllogismes
### Description
Cette page répertorie les 256 cas possibles de syllogismes ainsi que leur validité :
- Sans hypothèse d'existence
- Avec hypothèse d'existence
- Si le syllogisme est intéressant ou non

## Gestion de la langue
### Description
Le site est disponible dans les langues suivantes :
- Français
- Anglais

## Conclusion
Nous espérons que cette application vous sera utile dans vos études, vos travaux de recherche, ou simplement dans votre exploration de la logique. Amusez-vous en testant vos idées logiques ! 😊
