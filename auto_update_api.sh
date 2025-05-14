#!/bin/bash

PROJECT_DIR="/home/magichien/Bureau/fake-api-sync"
LOG_OK="/var/log/fakeapi.log"
LOG_ERR="/var/log/fakeapi_error.log"

echo "=== Début du script de mise à jour ==="

# Aller dans le dossier du projete
echo "Accès au dossier du projet..."
cd "$PROJECT_DIR" || {
    echo "Erreur : Dossier $PROJECT_DIR introuvable"
    echo "$(date): Dossier projet introuvable" >> "$LOG_ERR"
    exit 1
}

# Se placer sur la branche main
echo "Passage sur la branche main..."
git checkout main >> "$LOG_OK" 2>>"$LOG_ERR"

# Effectuer le pull depuis GitHub
echo "Mise à jour depuis GitHub..."
git pull origin main >> "$LOG_OK" 2>>"$LOG_ERR"

# Comparer les commits avant/après
before_commit=$(git rev-parse HEAD)

# Vérifier si des fichiers ont été modifiés
echo "Vérification des fichiers modifiés..."
git diff --name-only HEAD@{1} HEAD > modified_files.txt

if [ -s modified_files.txt ]; then
    echo "Des fichiers ont été modifiés, redémarrage du serveur..."
    pm2 restart fake-api >> "$LOG_OK" 2>>"$LOG_ERR"
    echo "$(date): Redémarrage réussi" >> "$LOG_OK"
else
    echo "Aucun fichier modifié après pull. Pas de redémarrage nécessaire."
    echo "$(date): Aucun changement détecté" >> "$LOG_OK"
fi

echo "=== Fin du script ==="
