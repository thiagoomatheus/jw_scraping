import Link from "next/link";

export default function Page() {
    return (
        <section className="flex flex-col gap-5 md:gap-10 max-w-7xl">
            <h1>Política de Privacidade</h1>

            <p>Bem-vindo ao Designações NVMC! Este projeto valoriza sua privacidade e está comprometidos em proteger as informações pessoais que você compartilha por aqui. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais quando você acessa este site (designacoesnvmc.site) e utiliza a plataforma.</p>

            <h2>Informações que Coletamos:</h2>

            <p>Para oferecer a você uma experiência personalizada e eficiente, é coletado algumas informações básicas. Essas informações são:</p>

            <ul className="list-disc list-inside flex flex-col gap-5 md:gap-10">
                <li><strong>Nome e Endereço de E-mail:</strong> É coletado seu nome e endereço de e-mail quando você se cadastra em nosso site utilizando sua conta Google. Essas informações são essenciais para sua identificação e acesso à plataforma.</li>
                
                <li><strong>Número da Congregação:</strong> Para garantir que você visualize apenas as designações da sua congregação, é solicitado que informe o número da mesma após fazer login pela primeira vez.</li>
                
                <li><strong>Instância do WhatsApp:</strong> Você poderá informar sua instância do WhatsApp para receber notificações sobre as designações. Essa informação é compartilhada com a plataforma Evolution API, responsável pelo envio das mensagens.</li>
            </ul>

            <h2>Como suas Informações são Usadas:</h2>

            <p>Suas informações são usadas para:</p>

            <ul className="list-disc list-inside flex flex-col gap-5 md:gap-10">
                <li><strong>Funcionamento da plataforma:</strong> Criar sua conta, permitir acesso às designações da sua congregação, enviar notificações via WhatsApp e permitir a personalização da sua experiência no site.</li>
                
                <li><strong>Manter a segurança da plataforma:</strong> Utilizar o número da congregação para garantir que os usuários acessem apenas as informações relevantes.</li>
                
                <li><strong>Comunicar alterações:</strong> Notificar você sobre atualizações no serviço ou alterações na Política de Privacidade.</li>
            </ul>

            <h2>Compartilhamento de Informações:</h2>

            <p>É usado a plataforma Evolution API, que é responsável por enviar as notificações sobre as designações via WhatApp. Esta plataforma não coleta seus dados, apenas cria uma instancia do WhatsApp para que as mensagens sejam enviadas. Essa instancia do WhatsApp é mantida exclusivamente em nosso servidor e nenhuma informação pessoal é compartilhada com a Evolution API.</p>

            <h2>Proteção de Dados:</h2>

            <p>Trabalhamos para proteger suas informações pessoais de acesso não autorizado, alteração, divulgação ou destruição. As informações coletadas são armazenadas em nosso banco de dados PostgreSQL, protegido por uma senha forte e acessível apenas internamente.</p>

            <h2>Seus Direitos:</h2>

            <p>Você tem o direito de:</p>

            <ul className="list-disc list-inside flex flex-col gap-5 md:gap-10">
                <li><strong>Acessar suas informações:</strong> Visualizar, corrigir ou atualizar seus dados, exceto o endereço de e-mail.</li>
                
                <li><strong>Excluir sua conta:</strong> Remover suas informações pessoais da plataforma.</li>
            </ul>

            <h2>Alterações na Política de Privacidade:</h2>

            <p>Podemos atualizar esta Política de Privacidade periodicamente. Avisaremos você sobre quaisquer alterações significativas por e-mail.</p>

            <h2>Doações:</h2>

            <p>Esta plataforma não processa doações diretamente. Caso você opte por fazer uma doação, será redirecionado para um link de pagamento gerado pela plataforma <Link className="font-bold underline hover:text-blue-500" href={"https://www.asaas.com.br/"}>Asaas</Link>, onde suas informações serão processadas diretamente por eles. Nenhum dado de pagamento é compartilhado com esta plataforma.</p>

            <h2>Informações de Contato:</h2>

            <p>Para qualquer dúvida ou solicitação relacionada à nossa Política de Privacidade, entre em contato através do email <Link className="font-bold underline hover:text-blue-500" href="mailto:thiagomatheus2001@hotmail.com">thiagomatheus2001@hotmail.com</Link>.</p>

            <p className="text-sm font-bold italic">Última atualização: 04/11/2024</p>
        </section>
    )
}