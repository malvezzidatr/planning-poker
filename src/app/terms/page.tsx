import Header from "@/components/Header/Header";

export default function TermsPage() {
  return (
    <main className="bg-gray-100 p-8 px-[400px] mt-[80px] text-black mx-auto">
      <Header />
      <h1 className="text-4xl font-bold mb-6 text-[#DF0979]">Termos e Condições de Uso</h1>

      <p className="mb-6">
        Bem-vindo ao Planning Poker App! Ao acessar ou usar nosso site, você concorda em cumprir e estar vinculado a estes Termos e Condições. Se você não concorda com qualquer parte destes termos, por favor, não utilize o nosso serviço.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">1. Uso do Serviço</h2>
        <p>
          O Planning Poker App é uma ferramenta colaborativa para estimativas ágeis. Você concorda em usar este serviço apenas para fins legais e de acordo com todas as leis aplicáveis.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">2. Conta e Segurança</h2>
        <p>
          Para participar das salas, você precisa informar um nome de usuário. Você é responsável por manter a confidencialidade do seu nome de usuário e por todas as atividades que ocorrem em sua conta.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">3. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo, código-fonte, design e marca relacionados ao Planning Poker App são de propriedade exclusiva do desenvolvedor e protegidos por leis de direitos autorais e propriedade intelectual.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">4. Isenção de Responsabilidade</h2>
        <p>
          O serviço é fornecido "no estado em que se encontra" e "conforme disponível". Não garantimos que o serviço será ininterrupto, livre de erros ou seguro. Você usa o Planning Poker App por sua conta e risco.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">5. Modificações no Serviço e Termos</h2>
        <p>
          Podemos modificar ou descontinuar o serviço a qualquer momento, bem como alterar estes termos. Recomendamos revisar periodicamente esta página para estar ciente de mudanças.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">6. Limitação de Responsabilidade</h2>
        <p>
          Em nenhuma circunstância o desenvolvedor será responsável por quaisquer danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de uso do serviço.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">7. Lei Aplicável</h2>
        <p>
          Estes termos serão regidos e interpretados de acordo com as leis brasileiras, sem considerar conflitos de princípios legais.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">8. Contato</h2>
        <p>
          Se você tiver dúvidas sobre estes Termos, por favor, entre em contato pelo email: <a href="mailto:malvezzi.dev@gmail.com" className="text-[#DF0979] underline">malvezzi.dev@gmail.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">9. Privacidade e Dados Pessoais</h2>
        <p>
          O Planning Poker App armazena localmente em seu navegador o nome de usuário para facilitar seu uso nas salas. Não coletamos nem armazenamos seus dados pessoais em nossos servidores. Você concorda com o uso dessa tecnologia local para funcionamento do serviço.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">10. Regras de Conduta</h2>
        <p>
          É proibido usar o serviço para fins ilegais, abusivos, ofensivos, difamatórios ou que violem direitos de terceiros. O usuário se compromete a respeitar os demais participantes e não praticar atos que prejudiquem o funcionamento do serviço.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">11. Suspensão e Encerramento</h2>
        <p>
          Reservamo-nos o direito de suspender ou encerrar seu acesso ao Planning Poker App em caso de violação destes Termos ou uso indevido do serviço, sem aviso prévio.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">12. Suporte e Garantias</h2>
        <p>
          O Planning Poker App é um serviço oferecido gratuitamente e sem garantias explícitas. Não nos responsabilizamos por eventuais falhas, interrupções ou perda de dados. Não oferecemos suporte técnico formal.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">13. Conteúdo de Terceiros</h2>
        <p>
          O serviço pode conter links ou referências a sites e conteúdos de terceiros. Não nos responsabilizamos pelo conteúdo, políticas ou práticas desses terceiros.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">14. Cookies e Tecnologias Semelhantes</h2>
        <p>
          Utilizamos tecnologias como cookies e armazenamento local para melhorar sua experiência. Você pode controlar essas tecnologias pelas configurações do seu navegador.
        </p>
      </section>
    </main>
  );
}
