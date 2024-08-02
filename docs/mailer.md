Na configuração de ambiente local, o mailer está configurado para processar
o envio a partir do mailhog localmente.

comando na máquina:
'''
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
'''

caso a inicialização seja realizada pelo Docker, não é necessário inserir o comando na máquina.

O email local ficará aberto em http://localhost:8025

dos2unix start.sh
