mkdir -p ~/.ssh
echo -e "${{SSH_key}}//_/\\n" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
# ssh-keyscan -p <number> -t rsa <url> 2>&! >> ~/.known_hosts