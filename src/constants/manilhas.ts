export type ManilhaVariant = 'velha' | 'nova_composta' | 'nova_limpa';

interface ManilhaInfo {
  title: string;
  description: string;
  bullets: string[];
}

export const MANILHA_INFO: Record<ManilhaVariant, ManilhaInfo> = {
  velha: {
    title: 'Manilha Velha (Truco Mineiro)',
    description:
      'Baseada no zap sempre sendo 4 de paus. Depois vêm o 7 de copas, o ás de espadas (espadilha) e o 7 de ouros (pica-fumo). É a forma mais tradicional em Minas Gerais e interior do Brasil.',
    bullets: [
      'Não existe vira. A ordem das manilhas é fixa em todas as rodadas.',
      'Baralho costuma usar 40 cartas (sem 8, 9 e 10). Alguns butecos também retiram as damas.',
      'Cada mão vale 1 ponto, mas a galera joga pedindo 3, 6, 9, 12 e até 15.',
    ],
  },
  nova_composta: {
    title: 'Truco Paulista - Manilha Nova (com 4, 5, 6 e 7)',
    description:
      'No truco paulista completo o vira define qual carta vira manilha. Se virar um 4, as manilhas serão os 5; se virar um 5, serão os 6 e assim por diante até chegar no zap.',
    bullets: [
      'Usa o baralho de 40 cartas com 4, 5, 6 e 7 presentes.',
      'A ordem das cartas muda a cada rodada conforme o vira.',
      'Em São Paulo é comum jogar em trios e com contagem até 12 pontos.',
    ],
  },
  nova_limpa: {
    title: 'Truco Paulista Limpo - Manilha Nova (sem 4, 5, 6 e 7)',
    description:
      'Variação muito comum no litoral paulista. Remove 4, 5, 6 e 7 do baralho, deixando o vira determinar a sequência entre ás, dois e três.',
    bullets: [
      'Facilita embaralhar e acelera o jogo por ter menos cartas.',
      'Ideal quando o baralho está surrado. É só tirar as cartas marcadas e seguir o baile.',
      'Mantém o jeito paulista de pedir truco, seis e nove, mas sem as cartas baixas.',
    ],
  },
};

export const MANILHA_VARIANTS: ManilhaVariant[] = ['velha', 'nova_composta', 'nova_limpa'];
