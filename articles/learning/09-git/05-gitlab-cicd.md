# GitLab CI CD

Catatan sementara CI/CD Gitlab

- Repository: https://gitlab.com/lyrihkaesa/projectanda

## Mengatur Variable

- `projectanda` > `Settings` > `CI/CD` > `Variables`
  **Project variables**
  Variables can be accidentally exposed in a job log, or maliciously sent to a third party server. The masked variable feature can help reduce the risk of accidentally exposing variable values, but is not a guaranteed method to prevent malicious users from accessing variables. [How can I make my variables more secure?](https://gitlab.com/help/ci/variables/_index.md#cicd-variable-security)

|CI/CD Variables| Referral Values [Add variable]|

Klik `Add Variable`

- Project variable ☑
- Expand variable reference ☑

| Key                | Value                                                                                                                                                                                                                 | Type               | Environments  | Visibility | PV  | EVR | Description |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------- | ---------- | --- | --- | ----------- |
| COMPOSER_PATH      | /opt/cpanel/composer/bin/composer                                                                                                                                                                                     | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |
| DEPLOY_PATH        | ~/public_html/projectanda                                                                                                                                                                                             | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |
| PHP83_PATH         | /opt/alt/php83/usr/bin/php                                                                                                                                                                                            | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |
| HOST_PRIVATE_KEY   | -----BEGIN OPENSSH PRIVATE KEY-----\<br\>b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAAdzc2gtcn\<br\>.......\<br\>HfXoVgPbzoEAAAANZ2l0bGFiLWRlcGxveQECAwQFBg==\<br\>-----END OPENSSH PRIVATE KEY----- | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |
| SSH_HOST           | charapon.my.id                                                                                                                                                                                                        | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |
| SSH_PORT           | 65002                                                                                                                                                                                                                 | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |
| SSH_USER           | kaesa                                                                                                                                                                                                                 | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |
| MAINTENANCE_SECRET | rahasia                                                                                                                                                                                                               | Variable (default) | All (Default) | Visible    | ☑  | ☑  |             |

- Buat file `.gitlab-ci.yml` pada root project

```yml
stages:
  - deploy

deploy-to-share-hosting:
  stage: deploy
  only:
    - main
  before_script:
    - mkdir -p ~/.ssh
    - echo "$HOST_PRIVATE_KEY" > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - rm -f ~/.ssh/known_hosts
    - ssh-keyscan -p $SSH_PORT $SSH_HOST >> ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts

  script:
    - echo "🚀 Deploying to $SSH_USER@$SSH_HOST:$SSH_PORT"
    - ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -p $SSH_PORT $SSH_USER@$SSH_HOST "cd $DEPLOY_PATH && $PHP83_PATH artisan down --secret=$MAINTENANCE_SECRET && git pull origin main && $PHP83_PATH $COMPOSER_PATH install --no-dev --optimize-autoloader --no-scripts && $PHP83_PATH artisan migrate --force && $PHP83_PATH artisan optimize:clear && $PHP83_PATH artisan optimize && $PHP83_PATH artisan up"
```

- Tanpa ini jika manual install saja: `&& $PHP83_PATH $COMPOSER_PATH install --no-dev --optimize-autoloader --no-scripts `
