import Link from "next/link";

export default function Page() {
    return (
        <section className="flex flex-col gap-5 md:gap-10 max-w-7xl">
            <h1>Termos de Serviço</h1>

            <p>Bem-vindo ao Designações NVMC! Este Termo de Serviço (&quot;Termo&quot;) define os termos e condições que regem o acesso e uso do site designacoesnvmc.site e de todos os seus recursos (&quot;Serviço&quot;).</p>

            <h2>Aceitação do Termo:</h2>

            <p>Ao acessar ou utilizar o Serviço, você concorda em se vincular a este Termo. Se você não concorda com os termos deste Termo, por favor, não utilize o Serviço.</p>

            <h2>Uso do Serviço:</h2>

            <p>O Designações NVM fornece uma plataforma gratuita para auxiliar na organização de designações para reuniões das Testemunhas de Jeová. <strong>O Designações NVMC não é afiliado, nem de propriedade, nem é oferecido pela entidade jurídica das Testemunhas de Jeová.</strong> Trata-se de uma plataforma independente, criada para facilitar algumas tarefas presentes no cotidiano de algumas Testemunhas de Jeová. Você pode usar o Serviço para:</p>

            <ul className="list-disc list-inside flex flex-col gap-5 md:gap-10">
                <li>Criar e editar designações para semanas específicas;</li>
                
                <li>Selecionar participantes para cada designação;</li>
                
                <li>Imprimir uma folha de designações pronta;</li>
                
                <li>Enviar notificações aos participantes por WhatsApp, utilizando a plataforma Evolution API.</li>
            </ul>

            <h2>Responsabilidade do Usuário:</h2>

            <p>Você é responsável por:</p>

            <ul className="list-disc list-inside flex flex-col gap-5 md:gap-10">
                <li>Manter a confidencialidade de suas credenciais de login.</li>
                
                <li>Utilizar o Serviço de forma responsável e em conformidade com este Termo.</li>
                
                <li>Assegurar-se de que as informações fornecidas sejam precisas e completas.</li>
                
                <li>Não utilizar o Serviço para fins ilegais ou não autorizados.</li>
            </ul>

            <h2>Restrições de Uso:</h2>

            <p>Você não pode:</p>

            <ul className="list-disc list-inside flex flex-col gap-5 md:gap-10">
                <li>Utilizar o Serviço para enviar conteúdo ilegal, ofensivo ou prejudicial.</li>
                
                <li>Tentar acessar ou modificar partes do Serviço não autorizadas.</li>
                
                <li>Violar a segurança do Serviço ou de outros usuários.</li>
                
                <li>Interferir no funcionamento do Serviço.</li>
                
                <li>Reproduzir, distribuir ou modificar o Serviço sem autorização.</li>
            </ul>

            <h2>Propriedade Intelectual:</h2>

            <p>O Serviço e todos os seus recursos, incluindo, mas não se limitando a, o código-fonte, os designs, os gráficos e o conteúdo, são propriedade do Designações NVM ou seus licenciadores. Você não possui direitos sobre o Serviço, exceto o direito limitado de utilizá-lo de acordo com este Termo.</p>

            <h2>Isenção de Garantias:</h2>

            <p>O Serviço é fornecido &quot;como está&quot; e &quot;conforme disponível&quot;. <strong>O Designações NVM está em constante desenvolvimento e melhoria, o que pode resultar em instabilidades ou funcionalidades limitadas</strong>. O Designações NVM não garante que o Serviço seja livre de erros ou disponível sem interrupções. O Designações NVM não garante que o Serviço atenda às suas necessidades específicas ou que seja adequado para fins específicos.</p>

            <h2>Limitação de Responsabilidade:</h2>

            <p>O Designações NVMC não será responsável por quaisquer danos, incluindo, mas não se limitando a, danos diretos, indiretos, incidentais, consequenciais, punitivos ou especiais, decorrentes do uso ou da incapacidade de utilizar o Serviço.</p>

            <h2>Indenização:</h2>

            <p>Você concorda em indenizar e isentar o Designações NVMC, seus diretores, funcionários, agentes e licenciadores de quaisquer reivindicações, responsabilidades, custos e despesas (incluindo honorários advocatícios) decorrentes de seu uso do Serviço, de sua violação deste Termo ou de sua violação de quaisquer direitos de terceiros.</p>

            <h2>Modificações do Termo:</h2>

            <p>O Designações NVMC reserva-se o direito de modificar este Termo a qualquer momento. As alterações entrarão em vigor após a publicação do Termo atualizado no site. Você é responsável por verificar periodicamente este Termo para quaisquer alterações. O uso contínuo do Serviço após as alterações constituirá sua aceitação do Termo atualizado.</p>

            <h2>Rescisão:</h2>

            <p>O Designações NVMC pode rescindir este Termo e seu acesso ao Serviço a qualquer momento, por qualquer motivo, com ou sem aviso prévio.</p>

            <h2>Lei Aplicável:</h2>

            <p>Este Termo será regido e interpretado de acordo com as leis da jurisdição brasileira.</p>

            <h2>Dispensa:</h2>

            <p>A falha do Designações NVMC em fazer valer qualquer direito ou disposição deste Termo não constituirá uma renúncia a tal direito ou disposição.</p>

            <h2>Divisibilidade:</h2>

            <p>Se qualquer disposição deste Termo for considerada inválida ou inexequível, tal disposição será excluída e as demais disposições permanecerão em vigor.</p>

            <h2>Contatos:</h2>

            <p>Para quaisquer dúvidas ou solicitações relacionadas a este Termo, entre em contato conosco através d o email <Link className="font-bold underline hover:text-blue-500" href="mailto:thiagomatheus2001@hotmail.com">thiagomatheus2001@hotmail.com</Link>.</p>

            <p className="text-sm font-bold italic">Última Atualização: 04/11/2024</p>
        </section>
    )
}